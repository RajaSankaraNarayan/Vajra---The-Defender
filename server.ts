import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // AI Forensic API endpoint
  app.post("/api/ai-audit", async (req, res) => {
    try {
      const { storeName, url, policyText, contactInfo, discountClaims, darkPatterns } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          success: true,
          mode: "heuristic_simulation",
          message: "API Key not configured. Using local heuristic evaluation engine.",
          aiAnalysis: null,
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are Unveil's Senior E-Commerce Forensic Fraud Investigator.
Analyze this online storefront for scam indicators vs legitimate discounts:

Store Name: ${storeName || "Unknown"}
URL: ${url || "Unknown"}
Contact & Support Info: ${JSON.stringify(contactInfo || {})}
Discount Claims: ${discountClaims || "Unknown"}
Terms/Policy Excerpt: ${policyText || "None provided"}
Detected Dark Patterns: ${JSON.stringify(darkPatterns || [])}

Evaluate across:
1. Support & Contact Integrity (e.g., free email domains @gmail/@hotmail, missing physical address, synthetic VOIP).
2. Infrastructure & Plagiarism (placeholder text like [Company Name], generic return clauses copied from dropship scam templates).
3. Behavioral Scarcity (fake resetting countdowns, synthetic buyer popups).
4. False Positive Prevention: Clearly explain whether this is an authentic clearance sale or an ephemeral scam storefront.

Respond in JSON format with fields:
{
  "scamLikelihood": "HIGH" | "MEDIUM" | "LOW" | "CLEARED",
  "riskScore": number (0-100),
  "summary": string,
  "keyEvidence": string[],
  "isLegitimateSale": boolean,
  "confidenceScore": number (0-100),
  "consumerAdvice": string
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      let parsed = {};
      try {
        parsed = JSON.parse(responseText);
      } catch (e) {
        parsed = { summary: responseText, scamLikelihood: "HIGH", riskScore: 85 };
      }

      return res.json({
        success: true,
        mode: "gemini_ai",
        data: parsed,
      });
    } catch (err: any) {
      console.error("AI Audit error:", err);
      return res.status(500).json({
        success: false,
        error: err.message || "Failed to conduct AI audit",
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Unveil Prototype" });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Unveil Server running on http://localhost:${PORT}`);
  });
}

startServer();
