import { MagnifyingGlass } from '@phosphor-icons/react'
import React from 'react'


import User01 from "../../images/user/user-01.png";
// import User01 from "D:\\college\\MyCodeDiary\\Project\\SDOS\\New\\Homiese\\Messaging\\MessagingApp\\src\\images\\user\\user-01.png"
import User02 from "../../images/user/user-02.png";
import User03 from "../../images/user/user-03.png";
import User04 from "../../images/user/user-04.png";
import User05 from "../../images/user/user-05.png";
import User06 from "../../images/user/user-06.png";
import User07 from "../../images/user/user-07.png";
import User08 from "../../images/user/user-08.png";

const List = [
  {
    imgSrc: User01,
    name: "Aman Tomar",
    message: "I cam across your profile and...",
  },
  {
    imgSrc: User02,
    name: "Meera",
    message: "I like your confidence 💪",
  },
  {
    imgSrc: User03,
    name: "Deepesh Sahu",
    message: "Can you share your offer?",
  },
  {
    imgSrc: User04,
    name: "Reena",
    message: `I'm waiting for you response!`,
  },
  {
    imgSrc: User05,
    name: "Prajil",
    message: "I cam across your profile and...",
  },
  {
    imgSrc: User06,
    name: "Ashish",
    message: "Can you share your offer?",
  },
  {
    imgSrc: User07,
    name: "Bhavya",
    message: `I'm waiting for you response!`,
  },
  {
    imgSrc: User08,
    name: "Sahil",
    message: "I cam across your profile and...",
  },
];



export default function ChatList() {
    return (
        <div className='hidden h-full flex-col xl:flex xl:w-1/4'>
            <div className='sticky border-b border-stroke dark:border-strokedark px-6 py-7.5 flex flex-row'>
                <h3 className='text-lg font-medium text-black dark:test-white 2xl:text-xl'>
                    Active  Conversations
                </h3>
                <span className='rounded-md border-[.5px] border-stroke dark:border-strokedark bg-gray px-2 py-0.5 text-base font-medium text-black dark:bg-boxdark-2 dark:text-white 2xl: ml-4'>
                    8
                </span>
            </div>
            {/* <div className='flex max-h-full flex-col overflow-auto p-5'>
                <form className='sticky mb-7'>
                    <input placeholder="search..." type="text" className='w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary' />
                </form>
            </div> */}
            <div className='flex max-h-full flex-col overflow-auto p-5'>
    <form className='sticky mb-7'>
        <input
            placeholder="search..."
            type="text"
            className='w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-red dark:border-strokedark dark:bg-boxdark-2'
        />
        <button className='absolute right-4 top-1/2 -translate-y-1/2'>
        <MagnifyingGlass size={24}></MagnifyingGlass></button>
    </form>
    <div className='no-scrollbar overflow-auto max-h-full space-y-2.5'>
        {List.map((object,item)=>{
            return <div className='flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark' key={item}>
                <div className='relative mr-3.5 h-11 w-full max-w-11 rounded-full'>
                    <img src={object.imgSrc} alt="profile" className='h-full w-full rounded-full object-cover object-center'/>
                    <span className='absolute bottom-0 right-0 block h-3 w-3 rounded-full border-gray-2 bg-success'></span>
                </div>
                <div className='w-full'>
                    <h5 className='text-sm font-medium text-black dark:text-white'>{object.name}</h5>
                    <p className='text-sm'>{object.message}</p>
                </div>
            </div>
        })}
    </div>
</div>


        </div>
    )
}
