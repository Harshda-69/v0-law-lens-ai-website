"use client"

export interface DocumentData {
  id: string
  title: string
  fileName: string
  uploadDate: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  content?: string
  riskLevel?: "high" | "medium" | "low"
  summary?: {
    overview: string
    keyPoints: string[]
    parties: Record<string, string>
    financialTerms: Record<string, string>
    riskLevel: string
  }
  riskClauses?: Array<{
    id: string
    text: string
    riskLevel: "high" | "medium" | "low"
    category: string
    explanation: string
    recommendation: string
    startIndex: number
    endIndex: number
  }>
}

class DocumentStore {
  private documents: DocumentData[] = []
  private listeners: Array<() => void> = []

  addDocument(doc: DocumentData) {
    this.documents.push(doc)
    this.notifyListeners()
  }

  updateDocument(id: string, updates: Partial<DocumentData>) {
    const index = this.documents.findIndex((doc) => doc.id === id)
    if (index !== -1) {
      this.documents[index] = { ...this.documents[index], ...updates }
      this.notifyListeners()
    }
  }

  getDocuments() {
    return this.documents
  }

  getDocument(id: string) {
    return this.documents.find((doc) => doc.id === id)
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener())
  }
}

export const documentStore = new DocumentStore()
