// import { InferenceClient } from "@huggingface/inference";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLEGEMINI_API_KEY });

// const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY0);

// app/api/route.js
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse JSON body

    console.log("this is the body data", body.code);

    // Process the data
    // const out = await client.chatCompletion({
    //   model: "meta-llama/Llama-3.1-8B-Instruct",
    //   messages: [
    //     {
    //       role: "user",
    //       content: `${body.prompt} ${body.code}`,
    //     },
    //   ],
    //   max_tokens: 512,
    // });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${body.prompt} ${body.code}`,
    });
    // Return a successful response
    console.log("output", response);
    return new Response(JSON.stringify({ data: response }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("server err", error);

    let message = "Unknown server error";
    let stack = "";
    let name = "server err";

    if (error instanceof Error) {
      message = error.message;
      stack = error.stack || "";
      name = error.name;
    }
    // Handle errors
    return new Response(JSON.stringify({ error: { message, stack, name } }), {
      status: 501,
      headers: { "Content-Type": "application/json" },
    });
  }
}
