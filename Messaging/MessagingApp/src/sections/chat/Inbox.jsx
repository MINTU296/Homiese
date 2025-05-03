import React from 'react'

import User01 from "../../images/user/user-01.png";
import { DotsThree, PaperPlaneTilt, User } from '@phosphor-icons/react';

export default function Inbox() {
    return (
        <div className='flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4'>
            {/* {chat header} */}
            <div className='sticky flex items-center flex-row justify-between border-b border-stroke dark:border-strokedark px-6 py-4.5'>
                <div className='flex items-center'>
                    <div className='mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full '>
                        <img src={User01} alt="avatar" className='h-full w-full object-cover object-center'></img>
                    </div>
                    <div>
                        <h5 className='font-medium text-black dark:text-white'>
                            Aman Tomar
                        </h5>
                        <p className='text-sm'>online</p>
                    </div>
                </div>
                <div><DotsThree weight='bold' size={24}></DotsThree></div>
            </div>
            {/* messages */}
            <div className='max-h-full space-y-3.5 overflow-auto no-scrollbar px-6 py-7.5 grow'>
                <div className='max-w-125'>
                    <p className='mb-2.5 text-sm font-medium'>Aman Tomar</p>
                    <div className='mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2 '><p>Hello Bhaiya...IIITD ka curriculum kaisa hai..ek baar please thoda sa bta dijiyega</p>
                        <p className='text-xs'>8:21 PM</p>

                    </div>
                </div>

                <div className='max-w-125 ml-auto'>
                    <p className='mb-2.5 text-sm font-medium'>You</p>
                    <div className='mb-2.5 rounded-2xl rounded-br-none bg-red px-5 py-3 text-white'>
                        <p>Hi, Aman..well it manageable although i will explain in great detail but currently i am in a meeting...How about we discuss about it in the late evening..</p>
                        <p className='text-xs text-white/80'>8:23 PM</p>
                    </div>
                </div>


                <div className='max-w-125'>
                    <p className='mb-2.5 text-sm font-medium'>Aman Tomar</p>
                    <div className='mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2 '><p>okay bhaiya...i will drop a message in the evening and let me know if it works for you</p>
                        <p className='text-xs'>8:24 PM</p>

                    </div>
                </div>

                

                <div className='max-w-125 ml-auto'>
                    <p className='mb-2.5 text-sm font-medium'>You</p>
                    <div className='mb-2.5 rounded-2xl rounded-br-none bg-red px-5 py-3 text-white'>
                        <p>sure...i will me more than happy to help..let's catch up in the evening</p>
                        <p className='text-xs text-white/80'>8:25 PM</p>
                    </div>
                </div>

                <div className='max-w-125'>
                    <p className='mb-2.5 text-sm font-medium'>Aman Tomar</p>
                    <div className='mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2 '><p>okay..thank you bhaiya</p>
                        <p className='text-xs'>8:26 PM</p>

                    </div>
                </div>




            </div>
            {/* {input} */}
            <div className='="sticky bottom border-t border-stroke bg-white px-6 py-5 dark:border-strokedar dark:bg-boxdark'>
                <form className='flex items-center justfy-between space-x-4.5'>
                    <div className='relative w-full'>
                        <input type="text" placeholder='Type here' className='h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none focus:border-red dark:border-strokedark dark:bg-box-dark-2'></input>
                    </div>
                    <button className='flex items-center justify-center h-13 max-w-13 w-full rounded-md bg-red text-white hover:bg-opacity-90'>
                        <PaperPlaneTilt size={24} weight='bold'></PaperPlaneTilt>
                    </button>
                </form>

            </div>


        </div>
    )
}
