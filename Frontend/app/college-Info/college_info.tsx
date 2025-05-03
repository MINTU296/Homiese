"use client";
import React, { useState} from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import collegeData from "@/app/college-Info/collegeData.json";
import CollegeAbout from "@/app/Components/collegeAbout";
import MentorPage from "@/app/Components/MentorPage";
import RelatedPostsCollege from "@/app/Components/relatedPostsCollege";

export default function     CollegePage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("page") || "";

    // Find the matching college data
    const college = collegeData.find((c) => c.name.toLowerCase() === query.toLowerCase());

    const [tab, setTab] = useState<number>(0);

    if (!college) {
        return (
            <div className="p-6 flex flex-col items-center text-gray-500">
                <h2 className="text-2xl font-bold">College Not Found</h2>
                <p>Try searching for a different college.</p>
            </div>
        );
    }

    return (
        <div className="p-6 flex flex-col gap-y-4 max-w-4xl mx-auto">
            <div className="relative w-full h-48">
                <Image src={college.banner} alt={college.name} layout="fill" objectFit="cover" className="rounded-lg"/>
            </div>

            <div className="flex items-center">
                <Image src={college.logo} alt={college.name} width={80} height={80} className="mr-4"/>
                <h1 className="text-2xl font-bold text-gray-500">{college.name}</h1>
            </div>

            <div className="flex gap-4">
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
                    Mentors
                </div>

                <div
                    onClick={() => setTab(2)}
                    className={`rounded-xl shadow-sm w-[50%] h-10 flex justify-center items-center cursor-pointer 
                        ${tab === 2 ? "bg-red-400 text-white" : "bg-white text-black"}
                    `}
                >
                    Related Posts
                </div>
            </div>

            {tab === 0 && (
                <CollegeAbout
                    College_name={college.name}
                    Highlights={college.highlights}
                    Courses={college.courses}
                    Fees={college.fees}
                    Placements={college.placements}
                    Scholarships={college.scholarships}
                    Reviews={college.reviews}
                    AdmissionProcess={college.admissionProcess}
                />
            )}

            {tab === 1 && <MentorPage mentors={college.mentors} />}

            {tab === 2 && <RelatedPostsCollege />}
        </div>
    );
}
