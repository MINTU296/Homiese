"use client"

import React, {useEffect, useState} from "react";
import Navbar from "@/app/Components/navbar";
import SideBar from "@/app/college-Info/collegeinfo_sidebar"
import {useAppStore} from "@/store";
import {apiClient} from "@/lib/api-client";
import {API_GET_USER} from "@/utils/constants";
import {useRouter} from "next/navigation";

export default function Infopage_layout({ children }: { children: React.ReactNode }) {
    const {userInfo , setUserInfo} = useAppStore();
    const [loading ,setLoading] = useState<boolean>(userInfo === undefined);
    const router = useRouter();

    useEffect(() => {
        if(!userInfo){
            const fetchUser = async () => {
                try {
                    const response = await apiClient(API_GET_USER, { withCredentials: true });
                    setUserInfo(response.data.user);
                    setLoading(false);
                } catch (e) {
                    console.log("Hello");
                    console.log(e)
                    router.push("/login");
                }
            };

            fetchUser();

        }
    }, []);


    return (
        <div className="flex h-screen flex-1 overflow-auto bg-gray-200">
            {/* Fixed Sidebar */}
            {
                loading  ? (
                    <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-lg font-medium">Loading ...</p>
                    </div>
                ) : (

                    <>
                        <div className="w-[250px] z-20 fixed h-full bg-white shadow-lg">
                            <SideBar />
                        </div>

                        <div className="flex-1">
                            <div className="fixed top-0 right-0 w-full bg-white shadow-md z-10">
                                <Navbar userName={userInfo.username} />
                            </div>

                            {/* Content below navbar */}
                            <main className="flex-1 p-4 mt-[60px] ml-[250px]">{children}</main>
                        </div>
                    </>
            )}
        </div>
    );
}
