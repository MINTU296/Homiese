"use client"
import Image from "next/image";
import Link from "next/link";


export default function Navbar({
    userName
} : {
    userName: string;
}) {


    return (
    <div className="flex gap-x-10 justify-end shadow-sm bg-white h-16">

        <div className="flex items-center gap-x-7 font-work-sans mx-6">
            <Image src="/notification.png" alt="Chat"  width={40} height={30}/>

            <Link href="/profile" className={"flex items-center gap-x-2"} >
                <Image src="/User.png" alt="Login"  width={40} height={40}/>
                <span>{userName} </span>
            </Link>
        </div>
    </div>
    );
}

