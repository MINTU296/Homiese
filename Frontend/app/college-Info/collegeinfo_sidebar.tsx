
"use client";
import Image from "next/image";
import TransitionButton from "@/app/Components/transitionButton";
import Link from "next/link";

export default function SideBar() {

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="top-0 fixed w-[250px] h-full shadow-xl bg-white flex flex-col gap-y-12 py-5">
            <Link href="/">
            <Image src="/Homiese.svg" alt="Homiese" width={140} height={30} className="ml-12 mt-4"/>
            </Link>
                <div className="flex flex-col gap-y-2 shadow h-[350px]">
                <TransitionButton svg="/explore.svg" text="College Info" onClick={() => scrollToSection("college-info")} />
                <TransitionButton svg="/explore.svg" text="Courses" onClick={() => scrollToSection("courses")} />
                <TransitionButton svg="/explore.svg" text="Admissions" onClick={() => scrollToSection("admissions")} />
                <TransitionButton svg="/explore.svg" text="Fees" onClick={() => scrollToSection("fees")} />
                <TransitionButton svg="/explore.svg" text="Placements" onClick={() => scrollToSection("placements")} />
                <TransitionButton svg="/settings.svg" text="Scholarships" onClick={() => scrollToSection("scholarships")} />
                <TransitionButton svg="/settings.svg" text="Reviews" onClick={() => scrollToSection("reviews")} />
            </div>
        </div>
    );
}

