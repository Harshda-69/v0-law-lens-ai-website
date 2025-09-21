"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, User, Building, AlertTriangle, CheckCircle, Download, Share, Eye } from "lucide-react"

// Mock data for demonstration
const mockSummaries = [
  {
    id: "1",
    title: "Software License Agreement - TechCorp",
    fileName: "techcorp-license-agreement.pdf",
    uploadDate: "2024-01-15",
    documentType: "License Agreement",
    status: "completed",
    summary: {
      overview:
        "This software license agreement establishes the terms for TechCorp's proprietary software usage. The agreement grants a non-exclusive, non-transferable license for internal business use only.",
      keyPoints: [
        "Non-exclusive license for internal use only",
        "Prohibition on reverse engineering or modification",
        "Annual renewal required with 30-day notice period",
        "Liability cap set at $50,000",
        "Termination clause allows immediate cancellation for breach",
      ],
      parties: {
        licensor: "TechCorp Solutions Inc.",
        licensee: "Your Company Name",
        effectiveDate: "January 1, 2024",
        expirationDate: "December 31, 2024",
      },
      financialTerms: {
        licenseFee: "$25,000 annually",
        paymentTerms: "Net 30 days",
        lateFees: "1.5% per month on overdue amounts",
      },
      riskLevel: "medium",
    },
  },
  {
    id: "2",
    title: "Employment Contract - Senior Developer",
    fileName: "employment-contract-john-doe.docx",
    uploadDate: "2024-01-14",
    documentType: "Employment Contract",
    status: "completed",
    summary: {
      overview:
        "Standard employment agreement for a Senior Developer position with competitive compensation package and standard benefits. Includes non-compete and confidentiality clauses.",
      keyPoints: [
        "Full-time employment with $120,000 annual salary",
        "Standard benefits package including health insurance",
        "12-month non-compete clause within 50-mile radius",
        "Intellectual property assignment to company",
        "At-will employment with 2-week notice period",
      ],
      parties: {
        employer: "Your Company Name",
        employee: "John Doe",
        effectiveDate: "February 1, 2024",
        position: "Senior Software Developer",
      },
      financialTerms: {
        salary: "$120,000 annually",
        bonus: "Up to 15% performance bonus",
        benefits: "Health, dental, vision, 401k matching",
      },
      riskLevel: "low",
    },
  },
  {
    id: "3",
    title: "Vendor Service Agreement - CloudHost",
    fileName: "cloudhost-service-agreement.pdf",
    uploadDate: "2024-01-13",
    documentType: "Service Agreement",
    status: "completed",
    summary: {
      overview:
        "Cloud hosting service agreement with CloudHost for infrastructure services. Agreement includes SLA guarantees and data protection clauses with some concerning liability limitations.",
      keyPoints: [
        "99.9% uptime SLA with service credits for downtime",
        "Data stored in US-based data centers",
        "Limited liability clause caps damages at monthly fees",
        "Automatic renewal unless cancelled with 60-day notice",
        "Data retention policy allows 30-day recovery window",
      ],
      parties: {
        provider: "CloudHost Technologies",
        client: "Your Company Name",
        effectiveDate: "January 1, 2024",
        term: "24 months",
      },
      financialTerms: {
        monthlyFee: "$2,500 per month",
        setupFee: "$500 one-time",
        overage: "$0.10 per GB over limit",
      },
      riskLevel: "high",
    },
  },
]

export function DocumentSummaries() {
  const [selectedSummary, setSelectedSummary] = useState(mockSummaries[0])

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "default"
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return CheckCircle
      case "medium":
        return AlertTriangle
      case "high":
        return AlertTriangle
      default:
        return CheckCircle
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Document List */}
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-lg font-semibold mb-4">Your Documents</h2>
        {mockSummaries.map((doc) => {
          const RiskIcon = getRiskIcon(doc.summary.riskLevel)
          return (
            <Card
              key={doc.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedSummary.id === doc.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedSummary(doc)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base leading-tight">{doc.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">{doc.fileName}</CardDescription>
                  </div>
                  <Badge variant={getRiskBadgeVariant(doc.summary.riskLevel)} className="ml-2">
                    <RiskIcon className="h-3 w-3 mr-1" />
                    {doc.summary.riskLevel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(doc.uploadDate).toLocaleDateString()}
                  <span className="mx-2">•</span>
                  <span>{doc.documentType}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary Details */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{selectedSummary.title}</CardTitle>
                <CardDescription className="mt-2">
                  {selectedSummary.fileName} • Uploaded {new Date(selectedSummary.uploadDate).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Original
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="key-points">Key Points</TabsTrigger>
                <TabsTrigger value="parties">Parties</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Document Summary</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedSummary.summary.overview}</p>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      {(() => {
                        const RiskIcon = getRiskIcon(selectedSummary.summary.riskLevel)
                        return <RiskIcon className="h-5 w-5 text-muted-foreground" />
                      })()}
                      <span className="font-medium">Risk Level:</span>
                      <Badge variant={getRiskBadgeVariant(selectedSummary.summary.riskLevel)}>
                        {selectedSummary.summary.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="key-points" className="mt-6">
                <div>
                  <h3 className="font-semibold mb-4">Key Points & Clauses</h3>
                  <ul className="space-y-3">
                    {selectedSummary.summary.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="parties" className="mt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">Parties & Dates</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(selectedSummary.summary.parties).map(([key, value]) => (
                      <div key={key} className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          {key.includes("Date") ? (
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <User className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        </div>
                        <p className="text-muted-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="mt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">Financial Terms</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(selectedSummary.summary.financialTerms).map(([key, value]) => (
                      <div key={key} className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        </div>
                        <p className="text-muted-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
