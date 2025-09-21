import { RiskAnalysis } from "@/components/risk-analysis"

export default function RiskAnalysisPage() {
  return (
    <div className="min-h-screen">
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Risk Analysis</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                AI-powered identification and highlighting of high-risk clauses in your legal documents
              </p>
            </div>
            <RiskAnalysis />
          </div>
        </div>
      </main>
    </div>
  )
}
