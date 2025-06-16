"use client"

import Image from "next/image";
import {useRouter} from "next/navigation";
import {useAppStore} from "@/store";
import {useEffect, useState} from "react";
import {apiClient} from "@/lib/api-client";
import {API_ADD_CONNECTION, API_GET_USER} from "@/utils/constants";


interface ObjectProps {
    id : string,
    name : string;
    course : string;
    batch : number;
    description : string;
}
export default function MentorDisplay(
    {
        id,
        name ,
        batch ,
        course ,
        description ,
    }: ObjectProps
){



    const router = useRouter();
    const {userInfo , setUserInfo} = useAppStore();

    const [loading , setLoading] = useState<boolean>(userInfo === undefined);

    const updateConnection = async (mentor_id : string) => {
        try {
            const response = await apiClient.post(API_ADD_CONNECTION , {
                mentor_id : mentor_id,
                mentee_id : userInfo.id
            }, {
                withCredentials : true,
            })

            console.log(response.data.message);
            router.push("/chat");
        }
        catch(e){
            console.log(e);
        }
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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-medium">Loading your profile...</p>
            </div>
        );
    }


    return (
        <div className={'flex rounded-2xl h-full shadow-xl p-3 gap-x-3 bg-white'}>

            <div className={'flex flex-col justify-center items-center w-1/4 '}>
                <Image src={'/UserImg.svg'} alt={'User Image'} width={70} height={20} />
                <span className={'font-semibold'}>
                    {name}
                </span>

            </div>

            <div className={'flex flex-col justify-center w-[60%]'}>
                <span>
                    Course&nbsp;: B.tech {course} ({batch})
                </span>
                <span>
                    About &nbsp; : {description}
                </span>
            </div>

            <div
            onClick={async () => {
               await updateConnection(id);
            }}
            className={'rounded-xl shadow-sm w-[20%] font-semibold text-white bg-red-400 h-10 flex justify-center items-center cursor-pointer'}>
                Connect
            </div>
        </div>
    );
}
