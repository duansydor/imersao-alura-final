import { NextRequest, NextResponse } from 'next/server'

import { model } from "../utils"



export async function POST(req: NextRequest) {
    const reqBody = await req.json()
    const message = reqBody.message
    const history = reqBody.history
    try {
        const chat = model.startChat({
            history: history
        })
        const result = await chat.sendMessage(message)
        const response = await result.response
        const text = response.text()
        return NextResponse.json(text)
        console.log()
    } catch (e) {
        return NextResponse.json({ msg: "error"+e })
    }

    // const result = await chat.send(message)
    // const response = await result.response
    // const text = response.text()
    
}
export async function GET() {

    return Response.json({ msg: "hello" })
}