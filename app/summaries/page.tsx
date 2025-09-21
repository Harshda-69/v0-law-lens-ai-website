import { DocumentSummaries } from "@/components/document-summaries"

export default function SummariesPage() {
  return (
    <div className="min-h-screen">
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Document Summaries</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                AI-generated summaries of your legal documents with key insights and important clauses
              </p>
            </div>
            <DocumentSummaries />
          </div>
        </div>
      </main>
    </div>
  )
}
