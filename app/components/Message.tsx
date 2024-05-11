import React from 'react'
const Message = (props:any) => {
  console.log(typeof props.content)
  return (
    <div className='w-full'>
        <div className={"p-2 my-4 min-h-32 max-h-fit max-w-96 w-52 "+props.role}>

        <span className='resposta-gemini prose' dangerouslySetInnerHTML={{__html:props.content[0]=='\"'? props.content.slice(1, -1):props.content}}></span>
      </div>
    </div>
  )
}

export default Message
