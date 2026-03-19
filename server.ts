import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Endpoint: Parse Image
  // Accepts multipart/form-data with an 'image' field or base64 in JSON
  app.post("/api/parse", upload.single('image'), async (req, res) => {
    try {
      let base64Data: string;
      let mimeType: string;

      if (req.file) {
        base64Data = req.file.buffer.toString('base64');
        mimeType = req.file.mimetype;
      } else if (req.body.image && req.body.mimeType) {
        base64Data = req.body.image;
        mimeType = req.body.mimeType;
      } else {
        return res.status(400).json({ error: "Missing image data. Provide a file in 'image' field or base64 in JSON." });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: mimeType,
                },
              },
              {
                text: "Analyze this image and provide a structured JSON response. Extract objects, any visible text, dominant colors, mood, and technical details.",
              },
            ],
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              objects: { type: Type.ARRAY, items: { type: Type.STRING } },
              text: { type: Type.STRING },
              colors: { type: Type.ARRAY, items: { type: Type.STRING } },
              mood: { type: Type.STRING },
              technicalDetails: {
                type: Type.OBJECT,
                properties: {
                  estimatedResolution: { type: Type.STRING },
                  aspectRatio: { type: Type.STRING },
                  lightingCondition: { type: Type.STRING },
                },
              },
            },
            required: ["summary", "objects", "text", "colors", "mood", "technicalDetails"],
          },
        },
      });

      const resultText = response.text;
      if (!resultText) throw new Error("No response from AI");
      
      const result = JSON.parse(resultText);
      res.json(result);
    } catch (error) {
      console.error("Parsing error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "SwiftParse Image Analyzer" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
