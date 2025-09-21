"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Shield, Eye, Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface RiskClause {
  id: string
  text: string
  riskLevel: "high" | "medium" | "low"
  category: string
  explanation: string
  recommendation: string
  startIndex: number
  endIndex: number
}

// Mock document data with risk analysis
const mockDocument = {
  id: "1",
  title: "Software License Agreement - TechCorp",
  fileName: "techcorp-license-agreement.pdf",
  content: `SOFTWARE LICENSE AGREEMENT

This Software License Agreement ("Agreement") is entered into on January 1, 2024, between TechCorp Solutions Inc., a Delaware corporation ("Licensor"), and Your Company Name, a corporation organized under the laws of California ("Licensee").

1. GRANT OF LICENSE
Subject to the terms and conditions of this Agreement, Licensor hereby grants to Licensee a non-exclusive, non-transferable license to use the Software solely for Licensee's internal business purposes. The Software may not be used for any commercial purposes beyond Licensee's internal operations.

2. RESTRICTIONS
Licensee shall not, and shall not permit any third party to: (a) copy, modify, or create derivative works of the Software; (b) reverse engineer, disassemble, or decompile the Software; (c) distribute, sell, lease, or sublicense the Software to any third party; or (d) use the Software in any manner that violates applicable laws or regulations.

3. LIABILITY LIMITATION
IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, INCURRED BY LICENSEE OR ANY THIRD PARTY, WHETHER IN AN ACTION IN CONTRACT OR TORT, EVEN IF LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. LICENSOR'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY LICENSEE UNDER THIS AGREEMENT IN THE TWELVE MONTHS PRECEDING THE CLAIM.

4. TERMINATION
This Agreement may be terminated by either party upon thirty (30) days written notice. Upon termination, Licensee shall immediately cease all use of the Software and destroy all copies in its possession. Licensor reserves the right to terminate this Agreement immediately upon any breach by Licensee.

5. INDEMNIFICATION
Licensee agrees to indemnify, defend, and hold harmless Licensor from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or resulting from Licensee's use of the Software or breach of this Agreement.

6. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles. Any disputes arising under this Agreement shall be resolved exclusively in the courts of Delaware.

7. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties and supersedes all prior or contemporaneous agreements, whether written or oral, relating to the subject matter hereof.`,
  riskClauses: [
    {
      id: "1",
      text: "IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, INCURRED BY LICENSEE OR ANY THIRD PARTY, WHETHER IN AN ACTION IN CONTRACT OR TORT, EVEN IF LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. LICENSOR'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY LICENSEE UNDER THIS AGREEMENT IN THE TWELVE MONTHS PRECEDING THE CLAIM.",
      riskLevel: "high" as const,
      category: "Liability Limitation",
      explanation:
        "This clause severely limits the licensor's liability and caps damages at a potentially very low amount. This could leave your company exposed to significant losses without recourse.",
      recommendation:
        "Negotiate for higher liability caps or carve-outs for certain types of damages, especially those related to data breaches or gross negligence.",
      startIndex: 1234,
      endIndex: 1789,
    },
    {
      id: "2",
      text: "Licensee agrees to indemnify, defend, and hold harmless Licensor from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or resulting from Licensee's use of the Software or breach of this Agreement.",
      riskLevel: "high" as const,
      category: "Indemnification",
      explanation:
        "This broad indemnification clause makes you responsible for defending the licensor against any claims related to your use of the software, which could be very costly.",
      recommendation:
        "Limit indemnification to specific scenarios like your breach of the agreement or misuse of the software. Exclude indemnification for the licensor's own negligence.",
      startIndex: 2456,
      endIndex: 2789,
    },
    {
      id: "3",
      text: "This Agreement may be terminated by either party upon thirty (30) days written notice.",
      riskLevel: "medium" as const,
      category: "Termination",
      explanation:
        "The licensor can terminate the agreement with only 30 days notice, which may not provide sufficient time to find alternative solutions.",
      recommendation:
        "Negotiate for longer notice periods (90-180 days) and include provisions for data migration assistance upon termination.",
      startIndex: 1890,
      endIndex: 1980,
    },
    {
      id: "4",
      text: "Any disputes arising under this Agreement shall be resolved exclusively in the courts of Delaware.",
      riskLevel: "medium" as const,
      category: "Jurisdiction",
      explanation:
        "Exclusive jurisdiction in Delaware may be inconvenient and costly for dispute resolution if your company is located elsewhere.",
      recommendation:
        "Negotiate for jurisdiction in your home state or agree to alternative dispute resolution methods like arbitration.",
      startIndex: 3123,
      endIndex: 3234,
    },
  ] as RiskClause[],
}

export function RiskAnalysis() {
  const [selectedDocument] = useState(mockDocument)
  const [selectedRisk, setSelectedRisk] = useState<RiskClause | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRisk, setFilterRisk] = useState<"all" | "high" | "medium" | "low">("all")

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "bg-red-100 border-red-300 text-red-800"
      case "medium":
        return "bg-yellow-100 border-yellow-300 text-yellow-800"
      case "low":
        return "bg-green-100 border-green-300 text-green-800"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800"
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

  const highlightRisks = (content: string, risks: RiskClause[]) => {
    const parts = []
    let lastIndex = 0

    // Sort risks by start index to process them in order
    const sortedRisks = [...risks].sort((a, b) => a.startIndex - b.startIndex)

    sortedRisks.forEach((risk) => {
      // Add text before the risk
      if (lastIndex < risk.startIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{content.slice(lastIndex, risk.startIndex)}</span>)
      }

      // Add the highlighted risk text
      parts.push(
        <span
          key={risk.id}
          className={`${getRiskColor(risk.riskLevel)} px-1 py-0.5 rounded cursor-pointer hover:opacity-80 transition-opacity`}
          onClick={() => setSelectedRisk(risk)}
          title={`${risk.category} - ${risk.riskLevel.toUpperCase()} RISK`}
        >
          {risk.text}
        </span>,
      )

      lastIndex = risk.endIndex
    })

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(<span key={`text-${lastIndex}`}>{content.slice(lastIndex)}</span>)
    }

    return parts
  }

  const filteredRisks = selectedDocument.riskClauses.filter((risk) => {
    const matchesSearch =
      risk.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterRisk === "all" || risk.riskLevel === filterRisk
    return matchesSearch && matchesFilter
  })

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Risk Summary Panel */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risk Overview</CardTitle>
            <CardDescription>{selectedDocument.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {selectedDocument.riskClauses.filter((r) => r.riskLevel === "high").length}
                </div>
                <div className="text-xs text-red-600">High Risk</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {selectedDocument.riskClauses.filter((r) => r.riskLevel === "medium").length}
                </div>
                <div className="text-xs text-yellow-600">Medium Risk</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {selectedDocument.riskClauses.filter((r) => r.riskLevel === "low").length}
                </div>
                <div className="text-xs text-green-600">Low Risk</div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                View Original
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Risk Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filter Risks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search risks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Risk Level</label>
              <div className="grid grid-cols-2 gap-2">
                {["all", "high", "medium", "low"].map((level) => (
                  <Button
                    key={level}
                    variant={filterRisk === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterRisk(level as any)}
                    className="capitalize"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Identified Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {filteredRisks.map((risk) => (
                  <div
                    key={risk.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                      selectedRisk?.id === risk.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedRisk(risk)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={getRiskBadgeVariant(risk.riskLevel) as any}>{risk.riskLevel.toUpperCase()}</Badge>
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">{risk.category}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{risk.text.substring(0, 80)}...</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Document Content */}
      <div className="lg:col-span-3">
        <Tabs defaultValue="document" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="document">Document with Highlights</TabsTrigger>
            <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="document" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{selectedDocument.title}</CardTitle>
                <CardDescription>Click on highlighted text to view risk details</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="prose prose-sm max-w-none leading-relaxed whitespace-pre-wrap">
                    {highlightRisks(selectedDocument.content, selectedDocument.riskClauses)}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            {selectedRisk ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>{selectedRisk.category}</span>
                    </CardTitle>
                    <Badge variant={getRiskBadgeVariant(selectedRisk.riskLevel) as any}>
                      {selectedRisk.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Identified Clause</h3>
                    <div className={`p-4 rounded-lg border ${getRiskColor(selectedRisk.riskLevel)}`}>
                      <p className="text-sm leading-relaxed">{selectedRisk.text}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Risk Explanation</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedRisk.explanation}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Recommendation</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedRisk.recommendation}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm">Request Legal Review</Button>
                    <Button variant="outline" size="sm">
                      Add to Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center space-y-2">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Select a risk from the list or click on highlighted text to view analysis
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
