import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Process a POST request
    const out = await hf.chatCompletion({
      model: "Qwen/Qwen3-32B",
      provider: "cerebras",
      messages: [{ role: "user", content: "Hello, nice to meet you!" }],
      max_tokens: 512,
      temperature: 0.1,
    });
  } else {
    // Handle any other HTTP method
  }
}
