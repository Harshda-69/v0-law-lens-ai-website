import { SignUpForm } from "@/components/auth/signup-form"

export default function SignUpPage() {
  return (
    <div className="min-h-screen">
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Get Started</h1>
              <p className="text-muted-foreground">
                Create your LawLens account to start analyzing legal documents with AI
              </p>
            </div>
            <SignUpForm />
          </div>
        </div>
      </main>
    </div>
  )
}
