import { NextRequest, NextResponse } from "next/server";

import { model } from "../utils";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const message = reqBody.message;
  const history = reqBody.history;
  try {
    const chat = model.startChat({
      history: history,
    });
    const confirmarCliente = await chat.sendMessage(`
          Seu nome é Dr. Ai, Você é um psicologo especializado em habitos, com respostas curtas e diretas é capaz de responder o cliente,
          tendo isto gravado siga um padrao conversacional para ajudar o cliente a responder suas duvidas:
          suas respostas devem ter o seguinte formato: <h1>[Titulo da resposta]</h1> • [passo 1], • [passo 2]
          prompt: Como faço para ser mais produtivo em [tema]
          resposta: <h1>Como ser mais produtivo em [tema]:</h1>siga estes 4 passos: Limpe sua cozinha, seu banheiro, seu cachorro , sua van
          
          prompt:${message}
          `);

    const clienteResponse = await confirmarCliente.response;
    const result = clienteResponse.text();

    const customContent = await model.generateContent(
      `converta este texto em plain text: ${result}`
    );
    const customizedResponse = await customContent.response;
    const text = customizedResponse.text();
    return NextResponse.json(text.replace(/\n/g, '<br />'));
  } catch (e) {
    return NextResponse.json({ msg: "error" + e });
  }
}
export async function GET() {
  const message = "Como faço para tomar mais agua"
  const history = [];
  try {
    const chat = model.startChat({
      history: history,
    });
    const confirmarCliente = await chat.sendMessage(`
          Seu nome é Dr. Ai, Você é um psicologo especializado em habitos, com respostas curtas e diretas é capaz de responder o cliente,
          tendo isto gravado siga um padrao conversacional para ajudar o cliente a responder suas duvidas:
          prompt:${message}
          `);

    const clienteResponse = await confirmarCliente.response;
    const result = JSON.parse(JSON.stringify({msg:clienteResponse.text().replace(/\n/g, '<br />')}));

    const customContent = await model.generateContent(
      `converta este texto em plain text: ${result}`
    );
    const customizedResponse = await customContent.response;
    const text = customizedResponse.text();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ msg: "error" + e });
  }
}
