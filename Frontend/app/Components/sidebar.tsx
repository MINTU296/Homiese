"use client";
import Image from "next/image";
import TransitionButton from "@/app/Components/transitionButton";
import Link from "next/link";
import {useRouter} from "next/navigation"

export default function SideBar({ onCollegeInfoClick }: { onCollegeInfoClick: () => void }) {
    const router = useRouter();

    const redirect = ()=>{
        router.push("/chat");
    }
    return (
        <div className="top-0 fixed w-[250px] h-full shadow-xl bg-white flex flex-col gap-y-12 py-5 text-black">
            <Link href={'/'}>
                <Image src="/Homiese.svg" alt="Homiese" width={140} height={30} className="ml-12 mt-4" />
            </Link>

            <div className="flex flex-col gap-y-2 shadow h-[250px]">
                <TransitionButton svg="/explore.svg" text={"Home"} />

                <TransitionButton svg="/explore.svg" text={"Mentor"} />
                <div onClick={redirect}>
                    <TransitionButton svg="/explore.svg" text={"Message"} />
                </div>
                    <button onClick={onCollegeInfoClick}>
                    <TransitionButton svg="/explore.svg" text={"College Info"} />
                </button>

                <TransitionButton svg="/settings.svg" text={"Settings"} />
            </div>
        </div>
    );
}
