import React from 'react'
const Message = (props:any) => {
  return (
    <div className='w-full'>
        <div className={"p-2 my-4 min-h-32 max-h-fit w-52 "+props.role}>
          {props.content}
      </div>
    </div>
  )
}

export default Message
