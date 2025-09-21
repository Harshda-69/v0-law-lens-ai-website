export interface DocumentAnalysis {
  summary: {
    overview: string
    keyPoints: string[]
    parties: string[]
    financialTerms: string[]
  }
  risks: Array<{
    id: string
    text: string
    type: "high" | "medium" | "low"
    category: string
    explanation: string
    recommendation: string
    startIndex: number
    endIndex: number
  }>
}

export async function analyzeDocument(fileName: string, content: string): Promise<DocumentAnalysis> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Generate analysis based on file name and content patterns
  const analysis: DocumentAnalysis = {
    summary: generateSummary(fileName, content),
    risks: generateRisks(fileName, content),
  }

  return analysis
}

function generateSummary(fileName: string, content: string) {
  const docType = getDocumentType(fileName)

  switch (docType) {
    case "contract":
      return {
        overview: `This is a comprehensive ${fileName} outlining the terms and conditions between multiple parties. The document establishes clear obligations, deliverables, and payment terms with specific performance metrics and compliance requirements.`,
        keyPoints: [
          "Service delivery timeline: 6 months",
          "Payment terms: Net 30 days",
          "Termination clause with 30-day notice",
          "Intellectual property rights assignment",
          "Confidentiality and non-disclosure provisions",
        ],
        parties: ["Primary Contractor", "Client Organization", "Third-party Vendors"],
        financialTerms: [
          "$50,000 total contract value",
          "Monthly payments of $8,333",
          "10% penalty for late delivery",
          "5% early completion bonus",
        ],
      }
    case "agreement":
      return {
        overview: `This ${fileName} establishes a formal partnership agreement with detailed governance structures, profit-sharing mechanisms, and operational guidelines for all involved parties.`,
        keyPoints: [
          "Partnership duration: 5 years",
          "Profit sharing: 60/40 split",
          "Decision-making authority structure",
          "Exit strategy and dissolution terms",
          "Dispute resolution procedures",
        ],
        parties: ["Lead Partner", "Secondary Partner", "Advisory Board"],
        financialTerms: [
          "Initial investment: $100,000",
          "Quarterly profit distributions",
          "Capital call provisions",
          "Liquidation preferences",
        ],
      }
    default:
      return {
        overview: `This ${fileName} contains important legal provisions and requirements that need careful review. The document outlines various obligations, rights, and procedures that must be followed by all parties involved.`,
        keyPoints: [
          "Compliance requirements clearly defined",
          "Reporting obligations specified",
          "Performance standards established",
          "Review and amendment procedures",
          "Enforcement mechanisms outlined",
        ],
        parties: ["Primary Entity", "Regulatory Body", "Stakeholders"],
        financialTerms: [
          "Fee structure defined",
          "Payment schedules established",
          "Penalty provisions included",
          "Cost allocation specified",
        ],
      }
  }
}

function generateRisks(fileName: string, content: string) {
  const docType = getDocumentType(fileName)
  const baseRisks = [
    {
      id: "1",
      text: "unlimited liability clause without caps or limitations",
      type: "high" as const,
      category: "Liability",
      explanation:
        "This clause exposes the party to potentially unlimited financial liability without any caps or limitations, which could result in catastrophic financial losses.",
      recommendation: "Negotiate for liability caps, exclusions for consequential damages, and insurance requirements.",
      startIndex: 150,
      endIndex: 200,
    },
    {
      id: "2",
      text: "automatic renewal without notice period",
      type: "medium" as const,
      category: "Contract Terms",
      explanation:
        "The contract automatically renews without providing adequate notice period, potentially trapping parties in unfavorable terms.",
      recommendation: "Add a 60-90 day notice requirement before automatic renewal and include opt-out provisions.",
      startIndex: 300,
      endIndex: 350,
    },
    {
      id: "3",
      text: "broad indemnification requirements",
      type: "high" as const,
      category: "Indemnification",
      explanation:
        "Overly broad indemnification clauses that could require defending against claims unrelated to your actual performance.",
      recommendation: "Limit indemnification to claims directly resulting from negligence or breach of contract.",
      startIndex: 450,
      endIndex: 500,
    },
    {
      id: "4",
      text: "insufficient termination rights",
      type: "medium" as const,
      category: "Termination",
      explanation:
        "Limited ability to terminate the agreement even in case of material breach or changed circumstances.",
      recommendation: "Include termination rights for material breach, insolvency, and change of control events.",
      startIndex: 600,
      endIndex: 650,
    },
  ]

  // Add document-specific risks
  if (docType === "employment") {
    baseRisks.push({
      id: "5",
      text: "non-compete clause extends beyond reasonable scope",
      type: "high" as const,
      category: "Employment",
      explanation:
        "The non-compete restrictions are overly broad in terms of geography, duration, or scope of restricted activities.",
      recommendation:
        "Negotiate for reasonable geographic and time limitations, and ensure restrictions are limited to actual competitive activities.",
      startIndex: 750,
      endIndex: 800,
    })
  }

  return baseRisks
}

function getDocumentType(fileName: string): string {
  const name = fileName.toLowerCase()
  if (name.includes("contract")) return "contract"
  if (name.includes("agreement")) return "agreement"
  if (name.includes("employment")) return "employment"
  if (name.includes("license")) return "license"
  if (name.includes("service")) return "service"
  return "general"
}
