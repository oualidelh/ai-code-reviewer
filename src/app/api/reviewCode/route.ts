import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY0);

// app/api/route.js
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse JSON body

    console.log("this is the body data", body.code);

    // Process the data
    const out = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "user",
          content: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I’m sharing a piece of code written in ${body.code}.
Your job is to deeply review this code and provide the following:

1️⃣ A quality rating: Better, Good, Normal, or Bad.
2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.
3️⃣ A clear explanation of what the code does, step by step.
4️⃣ A list of any potential bugs or logical errors, if found.
5️⃣ Identification of syntax errors or runtime errors, if present.
6️⃣ Solutions and recommendations on how to fix each identified issue.

Analyze it like a senior developer reviewing a pull request.
`,
        },
      ],
      max_tokens: 512,
    });
    // Return a successful response
    console.log("output", out);
    return new Response(JSON.stringify({ data: out }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle errors
    return new Response(
      JSON.stringify({ error: `Failed to process request ${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
