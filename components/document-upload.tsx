"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { documentStore, type DocumentData } from "@/lib/document-store"
import { analyzeDocument } from "@/lib/ai-processor"
import Link from "next/link"

interface UploadedFile {
  file: File
  id: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  error?: string
}

export function DocumentUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: "uploading",
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])
    setIsUploading(true)

    // Process each file
    newFiles.forEach((uploadedFile) => {
      processFile(uploadedFile)
    })
  }, [])

  const processFile = async (uploadedFile: UploadedFile) => {
    try {
      // Simulate upload progress
      let progress = 0
      const uploadInterval = setInterval(() => {
        progress += Math.random() * 15
        setUploadedFiles((prev) =>
          prev.map((file) => (file.id === uploadedFile.id ? { ...file, progress: Math.min(progress, 100) } : file)),
        )

        if (progress >= 100) {
          clearInterval(uploadInterval)
          // Start processing phase
          setUploadedFiles((prev) =>
            prev.map((file) => (file.id === uploadedFile.id ? { ...file, status: "processing", progress: 0 } : file)),
          )

          // Process with AI
          processWithAI(uploadedFile)
        }
      }, 200)
    } catch (error) {
      setUploadedFiles((prev) =>
        prev.map((file) => (file.id === uploadedFile.id ? { ...file, status: "error", error: "Upload failed" } : file)),
      )
    }
  }

  const processWithAI = async (uploadedFile: UploadedFile) => {
    try {
      // Simulate processing progress
      let progress = 0
      const processingInterval = setInterval(() => {
        progress += Math.random() * 10
        setUploadedFiles((prev) =>
          prev.map((file) => (file.id === uploadedFile.id ? { ...file, progress: Math.min(progress, 100) } : file)),
        )
      }, 300)

      // Read file content (simulated)
      const fileContent = await readFileContent(uploadedFile.file)

      const analysis = await analyzeDocument(uploadedFile.file.name, fileContent)

      clearInterval(processingInterval)

      // Mark as completed
      setUploadedFiles((prev) =>
        prev.map((file) => (file.id === uploadedFile.id ? { ...file, status: "completed", progress: 100 } : file)),
      )

      const documentData: DocumentData = {
        id: uploadedFile.id,
        title: uploadedFile.file.name.replace(/\.[^/.]+$/, ""),
        fileName: uploadedFile.file.name,
        uploadDate: new Date().toISOString().split("T")[0],
        status: "completed",
        progress: 100,
        riskLevel: analysis.risks.some((r) => r.type === "high")
          ? "high"
          : analysis.risks.some((r) => r.type === "medium")
            ? "medium"
            : "low",
        content: fileContent,
        summary: analysis.summary,
        riskClauses: analysis.risks.map((risk) => ({
          id: risk.id,
          text: risk.text,
          riskLevel: risk.type,
          category: risk.category,
          explanation: risk.explanation,
          recommendation: risk.recommendation,
          startIndex: risk.startIndex,
          endIndex: risk.endIndex,
        })),
      }

      documentStore.addDocument(documentData)
      setIsUploading(false)
    } catch (error) {
      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.id === uploadedFile.id ? { ...file, status: "error", error: "Processing failed" } : file,
        ),
      )
      setIsUploading(false)
    }
  }

  const readFileContent = async (file: File): Promise<string> => {
    // Simulate file reading - in real implementation, this would extract text from PDF/DOCX
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`LEGAL DOCUMENT: ${file.name.toUpperCase()}

This document contains various legal clauses and provisions that have been analyzed by our AI system. The content includes liability limitations, indemnification clauses, termination provisions, and other important legal terms that require careful review.

LIABILITY LIMITATION: In no event shall the provider be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to this agreement.

TERMINATION: This agreement may be terminated by either party upon thirty (30) days written notice to the other party. Upon termination, all rights and obligations shall cease except those that by their nature should survive.

INDEMNIFICATION: The client agrees to indemnify, defend, and hold harmless the provider from and against any and all claims, damages, losses, costs, and expenses arising from the client's use of the services.

AUTOMATIC RENEWAL: This agreement shall automatically renew for successive one-year terms unless either party provides written notice of non-renewal at least sixty (60) days prior to the expiration of the then-current term.

GOVERNING LAW: This agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.`)
      }, 1000)
    })
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  })

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <Card className="border-2 border-dashed transition-colors hover:border-primary/50">
        <CardContent className="p-8">
          <div {...getRootProps()} className={cn("cursor-pointer text-center space-y-4", isDragActive && "opacity-50")}>
            <input {...getInputProps()} />
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{isDragActive ? "Drop files here" : "Upload your documents"}</h3>
              <p className="text-muted-foreground">Drag and drop your PDF or DOCX files here, or click to browse</p>
              <p className="text-sm text-muted-foreground">
                Maximum file size: 10MB • Supported formats: PDF, DOCX, DOC
              </p>
            </div>

            <Button variant="outline" size="lg" className="mt-4 bg-transparent">
              <FileText className="h-5 w-5 mr-2" />
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Uploaded Documents</h3>

          {uploadedFiles.map((uploadedFile) => (
            <Card key={uploadedFile.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{uploadedFile.file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Status Icon */}
                  {uploadedFile.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {uploadedFile.status === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}

                  {/* Remove Button */}
                  <Button variant="ghost" size="sm" onClick={() => removeFile(uploadedFile.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              {(uploadedFile.status === "uploading" || uploadedFile.status === "processing") && (
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {uploadedFile.status === "uploading" ? "Uploading..." : "AI Processing..."}
                    </span>
                    <span className="text-muted-foreground">{Math.round(uploadedFile.progress)}%</span>
                  </div>
                  <Progress value={uploadedFile.progress} className="h-2" />
                </div>
              )}

              {uploadedFile.status === "completed" && (
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/summaries">View Summary</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/risk-analysis">Risk Analysis</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/chatbot">Chat About Document</Link>
                  </Button>
                </div>
              )}

              {/* Error State */}
              {uploadedFile.status === "error" && uploadedFile.error && (
                <Alert className="mt-3" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{uploadedFile.error}</AlertDescription>
                </Alert>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Upload Tips */}
      <Card className="bg-secondary/30">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3">Upload Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Ensure your documents are clear and readable for best AI analysis</li>
            <li>• PDF files with text layers work better than scanned images</li>
            <li>• Large documents may take longer to process</li>
            <li>• Your documents are processed securely and deleted after analysis</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
