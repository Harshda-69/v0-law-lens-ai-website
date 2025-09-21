"use client"

import { useEffect, useState } from "react"

export default function ChatbotPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.innerHTML = `
      (function(d, t) {
        var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
        v.onload = function() {
          window.voiceflow.chat.load({
            verify: { projectID: '68cfc02ee9eba3825e86950d' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            render: {
              mode: 'embedded',
              target: document.getElementById('voiceflow-chat-container')
            },
            autostart: true
          });
          setTimeout(() => {
            document.querySelector('.loading-container')?.remove();
          }, 2000);
        }
        v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; 
        v.type = "text/javascript"; 
        s.parentNode.insertBefore(v, s);
      })(document, 'script');
    `
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="min-h-screen">
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Legal Assistant Chat</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Ask questions about your documents and get instant AI-powered legal insights
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg border overflow-hidden" style={{ height: "600px" }}>
              <div id="voiceflow-chat-container" className="w-full h-full relative">
                <div className="loading-container flex justify-center items-center h-full bg-gray-50">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-lg text-gray-600 mb-2">Loading your AI Legal Assistant...</p>
                    <p className="text-sm text-gray-500">Please wait while we initialize the chat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
