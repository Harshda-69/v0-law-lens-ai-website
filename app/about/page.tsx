import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Harshda",
      role: "Frontend Engineer",
      bio: "BTech undergraduate student in 2nd year specializing in frontend development. Expert in React, Next.js, and modern web technologies.",
    },
    {
      name: "Vaibhav Mishra",
      role: "Backend Engineer",
      bio: "BTech undergraduate student in 3rd year specializing in backend development. Skilled in Node.js, databases, and server architecture.",
    },
    {
      name: "Sakshi",
      role: "AI/ML Engineer",
      bio: "BTech undergraduate student in 2nd year specializing in AI/ML engineering. Focused on machine learning, NLP, and AI model development.",
    },
  ]

  const values = [
    {
      title: "Justice & Accuracy",
      description:
        "We believe in providing precise, reliable legal analysis that upholds the highest standards of accuracy.",
    },
    {
      title: "Accessibility",
      description:
        "Making advanced legal technology accessible to law firms of all sizes and individual practitioners.",
    },
    {
      title: "Innovation",
      description: "Continuously pushing the boundaries of what's possible with AI in legal document analysis.",
    },
    {
      title: "Excellence",
      description: "Committed to delivering exceptional results that exceed our clients' expectations.",
    },
  ]

  const achievements = [
    "Analyzed over 1M+ legal documents",
    "Trusted by 500+ law firms globally",
    "99.7% accuracy in risk detection",
    "Winner of LegalTech Innovation Award 2024",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              About LawLens
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Revolutionizing Legal <span className="text-sky-500">Document Analysis</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Founded in 2023, LawLens combines cutting-edge artificial intelligence with deep legal expertise to
              transform how legal professionals analyze, understand, and work with complex documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild>
                <Link href="/upload">Try LawLens Now →</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We're on a mission to democratize access to advanced legal analysis tools. By leveraging the power of
                artificial intelligence, we help legal professionals work more efficiently, reduce risks, and deliver
                better outcomes for their clients.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our platform combines the precision of machine learning with the nuanced understanding of legal experts,
                creating a tool that enhances human expertise rather than replacing it.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sky-500 text-lg">✓</span>
                    <span className="text-sm font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/law-office-modern.jpg"
                alt="Modern Law Office with AI Technology"
                width={600}
                height={400}
                className="rounded-lg shadow-lg opacity-70 max-w-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at LawLens
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:bg-slate-50 transition-colors duration-200">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">
                    {index === 0 && "⚖️"}
                    {index === 1 && "🤝"}
                    {index === 2 && "🚀"}
                    {index === 3 && "🏆"}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate BTech students building the future of legal technology
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:bg-slate-50 transition-colors duration-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-sky-500 font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Legal Practice?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of legal professionals who trust LawLens for their document analysis needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup">Get Started Free →</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/upload">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
