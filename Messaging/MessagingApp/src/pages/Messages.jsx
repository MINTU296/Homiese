import React from 'react'
import { ChatList, MessageInbox, Sidebar } from '../sections/chat'

export default function Messages() {
  return (
    <div className='h-screen overflow-hidden'>
      <div className='h-full rounded-sm border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex'>
        {/* {sidebar} */}
        <Sidebar/>
        {/* {ChatList} */}
        <ChatList/>
        {/* {inbox} */}
        <MessageInbox/>
      </div>
      
    </div>
  )
}
