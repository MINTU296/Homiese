"use client"
import React, {useEffect, useState} from "react";
import {useAppStore} from "@/store";
import {apiClient} from "@/lib/api-client";
import {API_GET_USER} from "@/utils/constants";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const {userInfo , setUserInfo} = useAppStore();
    const [loading , setLoading] = useState<boolean>(userInfo === undefined);
    const [tab , setTab] = useState<number>(0);
    const router = useRouter();
    const directToUpdate = () => {
        router.push("/profile/updateDetails");
    }

    useEffect(() => {
        if(!userInfo){
            const fetchUser = async () => {
                try {
                    const response = await apiClient(API_GET_USER, { withCredentials: true });
                    setUserInfo(response.data.user);
                } catch (e) {
                    console.error("Failed to fetch user info:", e);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }

    }, []);



    return (
        <div className="w-full">
            {loading ?
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-medium">Loading your profile...</p>
                </div>
                :
                <div className="h-full  ">
                    <div className="relative">
                        {/* Background Image */}
                        <Image
                            src="/collegeLife.jpg"
                            alt="Background"
                            className="w-full h-60 object-cover"
                            width={150} height={150}
                             />

                        {/* User Image - Circular, Positioned */}
                        <Image
                            src="/User.png"
                            alt="User"
                            width={150} height={150}
                            className="w-25 h-25 rounded-full border-1 border-white absolute left-6 -bottom-10 shadow-lg"
                        />
                    </div>

                    {/* Content Below Images */}
                    <div className="mt-7 p-5 border-black flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">{userInfo.firstname + " " + userInfo.lastname}</h2>
                            <p className="text-gray-600">{userInfo.role}</p>
                        </div>

                        <div className={"rounded-xl shadow-sm w-[20%] font-semibold text-white bg-red-400 h-10 flex justify-center items-center cursor-pointer"}
                            onClick={directToUpdate}
                        >
                            <span>Update Details</span>
                        </div>
                    </div>


                    <div className={"flex gap-10 px-4"}>
                        <div
                            onClick={() => setTab(0)}
                            className={`rounded-xl shadow-sm w-[50%] h-10 flex justify-center items-center cursor-pointer 
                        ${tab === 0 ? "bg-red-400 text-white" : "bg-white text-black"}
                    `}
                        >
                            About
                        </div>

                        <div
                            onClick={() => setTab(1)}
                            className={`rounded-xl shadow-sm w-[50%] h-10 flex justify-center items-center cursor-pointer 
                        ${tab === 1 ? "bg-red-400 text-white" : "bg-white text-black"}
                    `}
                        >
                            Posts
                        </div>

                        <div
                            onClick={() => setTab(2)}
                            className={`rounded-xl shadow-sm w-[50%] h-10 flex justify-center items-center cursor-pointer 
                        ${tab === 2 ? "bg-red-400 text-white" : "bg-white text-black"}
                    `}
                        >
                            Connections
                        </div>
                    </div>

                    { tab === 0 ? <div className=" p-6 mt-4 rounded-lg shadow-md w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between items-center w-full border border-gray-300 p-3 rounded-md bg-gray-50">
                                <strong className="w-1/3">Description</strong>
                                <span className="w-1/12 text-center">:</span>
                                <span className="w-1/2">{userInfo.description}</span>
                            </div>
                            <div className="flex justify-between items-center w-full border border-gray-300 p-3 rounded-md bg-gray-50">
                                <strong className="w-1/3">Name</strong>
                                <span className="w-1/12 text-center">:</span>
                                <span className="w-1/2">{userInfo.firstname} {userInfo.lastname}</span>
                            </div>
                            <div className="flex justify-between items-center w-full border border-gray-300 p-3 rounded-md bg-gray-50">
                                <strong className="w-1/3">Username</strong>
                                <span className="w-1/12 text-center">:</span>
                                <span className="w-1/2">{userInfo.username}</span>
                            </div>
                            <div className="flex justify-between items-center w-full border border-gray-300 p-3 rounded-md bg-gray-50">
                                <strong className="w-1/3">Email</strong>
                                <span className="w-1/12 text-center">:</span>
                                <span className="w-1/2">{userInfo.email}</span>
                            </div>
                            <div className="flex justify-between items-center w-full border border-gray-300 p-3 rounded-md bg-gray-50">
                                <strong className="w-1/3">Role</strong>
                                <span className="w-1/12 text-center">:</span>
                                <span className="w-1/2">{userInfo.role}</span>
                            </div>

                            {
                                userInfo.role === "Mentor" ? (
                                    <div className="flex justify-between items-center w-full border border-gray-300 p-3 rounded-md bg-gray-50">
                                        <strong className="w-1/3">Course</strong>
                                        <span className="w-1/12 text-center">:</span>
                                        <span className="w-1/2">B.tech {userInfo.course} ({userInfo.batch})</span>
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                    </div> :
                        <div></div>
                    }

                    { tab === 1 ? <div className=" p-6 mt-4 rounded-lg shadow-md w-full bg-white">
                            This is the post page
                        </div> :
                        <div></div>
                    }


                    {
                        tab ===2  ? (
                            <div>This is the connections part</div>
                        ) : (
                         <div></div>
                        )
                    }






                </div>


            }
        </div>
    )
}
