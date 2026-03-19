import React from 'react';
import { Terminal, Code, Cpu, Zap, Info } from 'lucide-react';

const ApiDocs: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#E4E3E0]">
      {/* Header */}
      <header className="border-b border-[#141414] p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tighter uppercase italic">SwiftParse.API</h1>
        </div>
        <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest">
          Status: Operational
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8 flex flex-col gap-12">
        {/* Hero */}
        <section className="flex flex-col gap-4">
          <span className="text-[11px] font-mono uppercase opacity-50 tracking-widest">Service Overview</span>
          <h2 className="text-5xl font-serif italic leading-tight tracking-tight">
            High-speed image parsing via Gemini 3 Flash.
          </h2>
          <p className="text-lg opacity-80 max-w-2xl">
            SwiftParse provides a robust REST API for extracting structured data from images. 
            Designed for backend integration with zero latency overhead.
          </p>
        </section>

        {/* API Reference */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-2 border-b border-[#141414] pb-2">
            <Code className="w-4 h-4" />
            <h3 className="text-sm font-bold uppercase tracking-widest">API Reference</h3>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-[#141414] text-[#E4E3E0] text-[10px] font-bold uppercase">POST</span>
                <code className="font-mono text-sm">/api/parse</code>
              </div>
              <p className="text-sm opacity-70">Analyze an image and return structured JSON.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[#141414] p-6 bg-white flex flex-col gap-4">
                <div className="flex items-center gap-2 opacity-50">
                  <Zap className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Method 1: Multipart</span>
                </div>
                <pre className="text-[10px] font-mono bg-[#141414]/5 p-3 overflow-x-auto">
{`curl -X POST \\
  -F "image=@photo.jpg" \\
  https://your-app.run.app/api/parse`}
                </pre>
              </div>

              <div className="border border-[#141414] p-6 bg-white flex flex-col gap-4">
                <div className="flex items-center gap-2 opacity-50">
                  <Cpu className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Method 2: JSON Base64</span>
                </div>
                <pre className="text-[10px] font-mono bg-[#141414]/5 p-3 overflow-x-auto">
{`curl -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"image": "base64...", "mimeType": "image/jpeg"}' \\
  https://your-app.run.app/api/parse`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Response Schema */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-[#141414] pb-2">
            <Info className="w-4 h-4" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Response Schema</h3>
          </div>
          <pre className="text-[11px] font-mono bg-[#141414] text-[#E4E3E0] p-6 overflow-x-auto border-l-8 border-emerald-500">
{`{
  "summary": "string",
  "objects": ["string"],
  "text": "string",
  "colors": ["string"],
  "mood": "string",
  "technicalDetails": {
    "estimatedResolution": "string",
    "aspectRatio": "string",
    "lightingCondition": "string"
  }
}`}
          </pre>
        </section>
      </main>

      <footer className="border-t border-[#141414] p-8 mt-20 text-center">
        <p className="text-[10px] font-mono uppercase opacity-50 tracking-[0.3em]">
          Powered by Gemini 3 Flash & SwiftParse Engine
        </p>
      </footer>
    </div>
  );
};

export default ApiDocs;
