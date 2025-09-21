"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Upload,
  MessageSquare,
  Shield,
  Clock,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Download,
  Eye,
  Plus,
} from "lucide-react"
import Link from "next/link"

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john@company.com",
  company: "Legal Corp",
  avatar: "",
  plan: "Professional",
  documentsAnalyzed: 47,
  risksCaught: 23,
  timesSaved: "156 hours",
}

// Mock dashboard data
const mockDocuments = [
  {
    id: "1",
    title: "Software License Agreement - TechCorp",
    fileName: "techcorp-license-agreement.pdf",
    uploadDate: "2024-01-15",
    status: "analyzed",
    riskLevel: "high",
    summary: "License agreement with liability limitations and broad indemnification clauses.",
    fileSize: "2.4 MB",
  },
  {
    id: "2",
    title: "Employment Contract - Senior Developer",
    fileName: "employment-contract-john-doe.docx",
    uploadDate: "2024-01-14",
    status: "analyzed",
    riskLevel: "low",
    summary: "Standard employment agreement with competitive compensation and benefits.",
    fileSize: "1.8 MB",
  },
  {
    id: "3",
    title: "Vendor Service Agreement - CloudHost",
    fileName: "cloudhost-service-agreement.pdf",
    uploadDate: "2024-01-13",
    status: "processing",
    riskLevel: "medium",
    summary: "Cloud hosting agreement currently being analyzed for risk assessment.",
    fileSize: "3.1 MB",
  },
  {
    id: "4",
    title: "NDA - Marketing Partnership",
    fileName: "marketing-nda.pdf",
    uploadDate: "2024-01-12",
    status: "analyzed",
    riskLevel: "low",
    summary: "Standard non-disclosure agreement with reasonable terms and conditions.",
    fileSize: "1.2 MB",
  },
]

const mockChatHistory = [
  {
    id: "1",
    document: "Software License Agreement - TechCorp",
    lastMessage: "What are the liability limitations in this contract?",
    timestamp: "2024-01-15 14:30",
    messageCount: 8,
  },
  {
    id: "2",
    document: "Employment Contract - Senior Developer",
    lastMessage: "Can you explain the non-compete clause?",
    timestamp: "2024-01-14 16:45",
    messageCount: 5,
  },
  {
    id: "3",
    document: "Vendor Service Agreement - CloudHost",
    lastMessage: "What happens if I want to terminate early?",
    timestamp: "2024-01-13 11:20",
    messageCount: 12,
  },
]

const mockAnalytics = {
  documentsThisMonth: 12,
  risksCaughtThisMonth: 8,
  averageRiskScore: 6.2,
  mostCommonRisk: "Liability Limitations",
}

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {mockUser.name}</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your legal documents today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button asChild>
            <Link href="/upload">
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Link>
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
            <AvatarFallback>
              {mockUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Analyzed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUser.documentsAnalyzed}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{mockAnalytics.documentsThisMonth}</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risks Identified</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUser.risksCaught}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{mockAnalytics.risksCaughtThisMonth}</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUser.timesSaved}</div>
            <p className="text-xs text-muted-foreground">Estimated review time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Risk Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.averageRiskScore}/10</div>
            <p className="text-xs text-muted-foreground">Across all documents</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="chat-history">Chat History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Documents
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/upload">
                      <Upload className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockDocuments.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{doc.title}</p>
                        <p className="text-sm text-muted-foreground">{doc.uploadDate}</p>
                      </div>
                    </div>
                    <Badge variant={getRiskBadgeVariant(doc.riskLevel) as any}>{doc.riskLevel}</Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/summaries">View All Documents</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Chat Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Chat Activity
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/chatbot">
                      <MessageSquare className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockChatHistory.slice(0, 3).map((chat) => (
                  <div key={chat.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm">{chat.document}</p>
                      <span className="text-xs text-muted-foreground">{chat.messageCount} messages</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{chat.lastMessage}</p>
                    <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/chatbot">Continue Chatting</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to help you get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" asChild>
                  <Link href="/upload">
                    <Upload className="h-6 w-6" />
                    <span>Upload New Document</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" asChild>
                  <Link href="/risk-analysis">
                    <Shield className="h-6 w-6" />
                    <span>Analyze Risks</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" asChild>
                  <Link href="/chatbot">
                    <MessageSquare className="h-6 w-6" />
                    <span>Ask AI Assistant</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Documents</CardTitle>
              <CardDescription>Manage and review your uploaded legal documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doc.fileName} • {doc.fileSize}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{doc.summary}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={getRiskBadgeVariant(doc.riskLevel) as any}>{doc.riskLevel} risk</Badge>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat-history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chat History</CardTitle>
              <CardDescription>Review your conversations with the AI legal assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockChatHistory.map((chat) => (
                  <div key={chat.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-medium">{chat.document}</h3>
                      </div>
                      <span className="text-sm text-muted-foreground">{chat.messageCount} messages</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">"{chat.lastMessage}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/chatbot">Continue Chat</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Risk Analysis Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">High Risk Documents</span>
                    <span className="text-sm font-medium">
                      {mockDocuments.filter((d) => d.riskLevel === "high").length}
                    </span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medium Risk Documents</span>
                    <span className="text-sm font-medium">
                      {mockDocuments.filter((d) => d.riskLevel === "medium").length}
                    </span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Low Risk Documents</span>
                    <span className="text-sm font-medium">
                      {mockDocuments.filter((d) => d.riskLevel === "low").length}
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Common Risk Types</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { type: "Liability Limitations", count: 8, percentage: 80 },
                    { type: "Indemnification Clauses", count: 6, percentage: 60 },
                    { type: "Termination Terms", count: 4, percentage: 40 },
                    { type: "Jurisdiction Issues", count: 3, percentage: 30 },
                  ].map((risk) => (
                    <div key={risk.type} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{risk.type}</span>
                        <span className="text-sm font-medium">{risk.count}</span>
                      </div>
                      <Progress value={risk.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
