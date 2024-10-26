import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }
    const chat_completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-8b-8192",
    });
    const responseMessage =
      chat_completion.choices[0]?.message?.content || "No response from Llama";
    return NextResponse.json({ response: responseMessage });
  } catch (error) {
    console.error("Error in chat api: ", error);
    return NextResponse.json(
      { error: "An error occured while procesing your request." },
      { status: 500 }
    );
  }
}
