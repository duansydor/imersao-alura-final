'use client'
import React, { useEffect, useState } from 'react'
import Message from './Message'

const MessagesContainer = () => {
    const [msg, setMsg] = useState("")
    const [error, setError] = useState("")
    const [chatHistory, setChatHistory] = useState([])
    const [chat, setChat] = useState([])
    const getResponse = async () => {
        setError("")
        if (!msg) {
            setError("Para começar, digite algo")
        }
        const options = {
            method: 'POST',
            body: JSON.stringify({
                history: chatHistory,
                message: msg
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const response = await fetch('/api', options)
            const result = await response.text()
            console.log(result)
            setChatHistory(oldChatHistory => [...oldChatHistory, {
                role: 'user',
                parts: [{ text: msg }]
            },
            {
                role: 'model',
                parts: [{ text: result }]
            }
            ])
            setChat(oldChat => [...oldChat, {
                role: 'user',
                parts: msg
            },
            {
                role: 'model',
                parts: result
            }
            ])
            setMsg("")
        } catch (error) {
            console.log(error)
            setError("Something went wrong! try again later")
        }
    }
    return (
        <div className='w-full h-full flex flex-col'>
            <div className="relative overflow-y-scroll h-96 w-96 gap-2 justify-end p-4 mr-auto ml-auto my-10 customscroll">
                {chat.map((msg) => {
                    return (

                        <Message content={msg.parts} role={msg.role} />

                    )
                })}

            </div>
            <div className="flex mr-auto ml-auto w-96 gap-4 mt-auto">
                <input className="bg-gray-600 h-9 w-full p-4 text-gray-300 rounded-md" value={msg} onChange={(e) => setMsg(e.target.value)} type="text" placeholder="opa" />
                <button className="h-9 bg-blue-500 px-4 rounded-md" onClick={() => getResponse()}>Enviar</button>
            </div>
            <div className='text-center text-red-300 w-96 ml-auto mr-auto'>
                {error ? <div>{error}</div> : <></>}
            </div>
        </div>

    )
}

export default MessagesContainer
