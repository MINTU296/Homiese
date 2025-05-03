"use client";
import Image from "next/image";
import TransitionButton from "@/app/Components/transitionButton";
import Link from "next/link";

export default function SideBar({ onCollegeInfoClick }: { onCollegeInfoClick: () => void }) {
    return (
        <div className="top-0 fixed w-[250px] h-full shadow-xl bg-white flex flex-col gap-y-12 py-5 text-black">
            <Link href={'/'}>
                <Image src="/Homiese.svg" alt="Homiese" width={140} height={30} className="ml-12 mt-4" />
            </Link>

            <div className="flex flex-col gap-y-2 shadow h-[250px]">
                <TransitionButton svg="/explore.svg" text={"Home"} />

                <TransitionButton svg="/explore.svg" text={"Mentor"} />
                <TransitionButton svg="/explore.svg" text={"Message"} />
                {/* Open search modal instead of directly navigating */}
                <button onClick={onCollegeInfoClick}>
                    <TransitionButton svg="/explore.svg" text={"College Info"} />
                </button>

                <TransitionButton svg="/settings.svg" text={"Settings"} />
            </div>
        </div>
    );
}
