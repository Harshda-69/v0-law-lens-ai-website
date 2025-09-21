"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, FileText, Clock, Sparkles } from "lucide-react"
import { documentStore } from "@/lib/document-store"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  documentContext?: string
}

interface Document {
  id: string
  title: string
  fileName: string
}

const suggestedQuestions = [
  "What are the key terms of this agreement?",
  "Are there any liability limitations I should be concerned about?",
  "What happens if I want to terminate this contract?",
  "What are my obligations under this agreement?",
  "Are there any automatic renewal clauses?",
  "What intellectual property rights are involved?",
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI legal assistant. I can help you understand your documents, identify risks, and answer questions about legal terms. Which document would you like to discuss?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    // Load documents from store
    const loadDocuments = () => {
      const storedDocs = documentStore.getDocuments()
      const formattedDocs = storedDocs.map((doc) => ({
        id: doc.id,
        title: doc.title,
        fileName: doc.fileName,
      }))
      setDocuments(formattedDocs)
    }

    loadDocuments()
    // Set up interval to check for new documents
    const interval = setInterval(loadDocuments, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string, documentId?: string) => {
    if (!documentId) {
      return "Please select a document first so I can provide specific analysis and answers about its content."
    }

    const document = documentStore.getDocument(documentId)
    if (!document) {
      return "I couldn't find the selected document. Please try selecting it again."
    }

    const message = userMessage.toLowerCase()

    if (message.includes("liability") || message.includes("liable")) {
      const liabilityRisks =
        document.riskClauses?.filter(
          (risk) => risk.category.toLowerCase().includes("liability") || risk.text.toLowerCase().includes("liability"),
        ) || []

      if (liabilityRisks.length > 0) {
        const risk = liabilityRisks[0]
        return `Based on my analysis of "${document.title}", I found significant liability concerns:\n\n**Risk Identified**: ${risk.category}\n\n**Clause**: "${risk.text}"\n\n**Risk Level**: ${risk.riskLevel.toUpperCase()}\n\n**Explanation**: ${risk.explanation}\n\n**Recommendation**: ${risk.recommendation}`
      }
    }

    if (message.includes("termination") || message.includes("terminate")) {
      return `Regarding termination in "${document.title}":\n\n**Current Terms**: Based on the document analysis, termination provisions include standard notice requirements.\n\n**Key Points**:\n• Either party may terminate with proper notice\n• Specific obligations survive termination\n• Data and confidentiality provisions remain in effect\n\n**Risk Assessment**: ${document.riskLevel.toUpperCase()} risk level detected for termination clauses.\n\nWould you like me to analyze specific termination risks in more detail?`
    }

    if (message.includes("key terms") || message.includes("summary")) {
      if (document.summary) {
        return `Here's a summary of "${document.title}":\n\n**Overview**: ${document.summary.overview}\n\n**Key Points**:\n${document.summary.keyPoints.map((point) => `• ${point}`).join("\n")}\n\n**Parties Involved**: ${document.summary.parties.join(", ")}\n\n**Financial Terms**: ${document.summary.financialTerms.join(", ")}\n\n**Overall Risk Level**: ${document.riskLevel.toUpperCase()}\n\nWould you like me to elaborate on any specific aspect?`
      }
    }

    if (message.includes("risk") || message.includes("danger")) {
      const highRisks = document.riskClauses?.filter((risk) => risk.riskLevel === "high") || []
      if (highRisks.length > 0) {
        return `I've identified ${highRisks.length} high-risk clause(s) in "${document.title}":\n\n${highRisks
          .map(
            (risk, index) =>
              `**${index + 1}. ${risk.category}**\n"${risk.text}"\n\n*Risk*: ${risk.explanation}\n*Recommendation*: ${risk.recommendation}`,
          )
          .join("\n\n")}\n\nWould you like me to analyze any of these risks in more detail?`
      }
    }

    // Default response with document context
    return `I'm analyzing "${document.title}" for you. This document has a ${document.riskLevel} risk level overall.\n\nI can help you with:\n• Contract terms and conditions analysis\n• Risk assessment and identification\n• Compliance requirements\n• Liability and indemnification clauses\n• Termination and renewal provisions\n\nWhat specific aspect would you like me to focus on? You can also try one of the suggested questions.`
  }

  const simulateAssistantResponse = (userMessage: string) => {
    setIsTyping(true)

    setTimeout(() => {
      const response = generateAIResponse(userMessage, selectedDocument?.id)

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date(),
        documentContext: selectedDocument?.title,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      documentContext: selectedDocument?.title,
    }

    setMessages((prev) => [...prev, userMessage])
    simulateAssistantResponse(inputValue)
    setInputValue("")
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Document Selection & Context */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Document</label>
              {documents.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No documents uploaded yet</p>
                  <p className="text-xs mt-1">Upload documents to start chatting</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                        selectedDocument?.id === doc.id ? "ring-2 ring-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setSelectedDocument(doc)}
                    >
                      <div className="flex items-start space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-tight">{doc.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{doc.fileName}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedDocument && (
              <div className="p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Active Context</span>
                </div>
                <p className="text-xs text-muted-foreground">{selectedDocument.title}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Suggested Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-3 text-wrap"
                  onClick={() => handleSuggestedQuestion(question)}
                  disabled={!selectedDocument}
                >
                  <span className="text-xs">{question}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-3">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-primary" />
                <span>Legal Assistant</span>
              </CardTitle>
              {selectedDocument && (
                <Badge variant="outline" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  {selectedDocument.title}
                </Badge>
              )}
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback
                        className={message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}
                      >
                        {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>

                    <div className={`flex-1 space-y-2 ${message.sender === "user" ? "text-right" : ""}`}>
                      <div
                        className={`inline-block max-w-[80%] p-4 rounded-lg ${
                          message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-secondary"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>

                      <div
                        className={`flex items-center space-x-2 text-xs text-muted-foreground ${
                          message.sender === "user" ? "justify-end" : ""
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.documentContext && (
                          <>
                            <span>•</span>
                            <span>{message.documentContext}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-secondary">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary p-4 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder={selectedDocument ? "Ask about your document..." : "Select a document first..."}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!selectedDocument || isTyping}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || !selectedDocument || isTyping}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {!selectedDocument && documents.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Please select a document from the sidebar to start chatting
                </p>
              )}

              {documents.length === 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Upload documents first to start chatting about them
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
