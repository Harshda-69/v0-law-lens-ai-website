import { DocumentUpload } from "@/components/document-upload"

export default function UploadPage() {
  return (
    <div className="min-h-screen">
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Upload Your Legal Document</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Upload PDF or DOCX files to get AI-powered analysis, summaries, and risk assessment
              </p>
            </div>
            <DocumentUpload />
          </div>
        </div>
      </main>
    </div>
  )
}
