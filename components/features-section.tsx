import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: "Document Summarization",
    description:
      "Get AI-generated summaries of complex legal documents in seconds, highlighting key points and important clauses.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Risk Analysis",
    description:
      "Automatically identify and highlight high-risk clauses with color-coded markers for immediate attention.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    title: "Interactive Chatbot",
    description: "Ask questions about your documents and get instant, contextual answers from our AI assistant.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lightning Fast",
    description: "Process documents in seconds, not hours. Our AI works at the speed of thought.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "24/7 Availability",
    description: "Access your legal assistant anytime, anywhere. No more waiting for office hours.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Team Collaboration",
    description: "Share insights and collaborate with your team on document analysis and risk assessment.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Powerful Features for Legal Professionals
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Everything you need to streamline your legal document workflow
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Advanced AI Document Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our cutting-edge AI technology processes legal documents with unprecedented accuracy, identifying key
                clauses, potential risks, and important terms that matter most to your practice.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-2xl font-bold text-sky-500">99.7%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-2xl font-bold text-sky-500">&lt; 30s</div>
                  <div className="text-sm text-muted-foreground">Processing Time</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/legal-documents-ai.jpg"
                alt="Legal documents being analyzed by AI"
                className="rounded-lg shadow-lg w-full max-w-md h-auto opacity-70"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-200"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center mb-4 text-sky-600">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <img
                src="/courthouse-justice.jpg"
                alt="AI-powered legal analysis interface"
                className="rounded-lg shadow-lg w-full max-w-md h-auto opacity-70"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-2xl font-bold">Intelligent Risk Detection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Never miss critical risks again. Our AI highlights problematic clauses, liability issues, and
                unfavorable terms with detailed explanations and actionable recommendations.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">High-risk clauses automatically flagged</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Medium-risk terms highlighted for review</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                  <span className="text-sm">Safe provisions clearly marked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
