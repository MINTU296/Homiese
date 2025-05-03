import { useState } from "react";
import Post from "@/app/Components/Post";

export default function Content() {
    const [forYou, setForYou] = useState<boolean>(true);

    const Trendingposts = [
        {
            ContentDescription: "This is a trending page",
            ContentImage: true,
            ContentPostedBy: "You",
            ContentProfileImage: "/UserImg.svg",
            ContentTitle: "Leader OP",
            ContentLiked: 26,
            ContentImagePath: "/contentImage.svg",
        },
        {
            ContentDescription: "React is awesome!",
            ContentImage: false,
            ContentPostedBy: "John Doe",
            ContentProfileImage: "/UserImg.svg",
            ContentTitle: "Why React Rocks",
            ContentLiked: 102,
            ContentImagePath: "",
        }
    ];

    const Userposts = [
        {
            ContentDescription: "Top Mistakes to Avoid When Choosing a College:\nIgnoring Location: Distance, weather, and job opportunities can impact your experience more than you expect..",
            ContentImage: true,
            ContentPostedBy: "Deepesh",
            ContentProfileImage: "/UserImg.svg",
            ContentTitle: "TOP Mistakes I did while choosing the college",
            ContentLiked: 26,
            ContentImagePath: "/post_image.jpeg",
        },
        {
            "ContentTitle": "How to Make the Best Use of College Life",
            "ContentDescription": "Get involved in clubs, build strong networks, explore internships, and develop valuable skills beyond academics. These years can shape your future!",
            "ContentImage": true,
            "ContentPostedBy": "Ashish Bargoti",
            "ContentProfileImage": "/UserImg.svg",
            "ContentLiked": 87,
            "ContentImagePath": "/collegeLife.jpg"
        },
        {
            "ContentTitle": "Ask a Question",
            "ContentDescription": "Is it true that IITD is more research focused than any other JAC colleges",
            "ContentImage": false,
            "ContentPostedBy": "Ashish Bargoti",
            "ContentProfileImage": "/UserImg.svg",
            "ContentLiked": 87,
            "ContentImagePath": "/collegeLife.jpg"
        }
        
    ];

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-center py-[2%]">
                {/* "For You" Button */}
                <div
                    onClick={() => setForYou(true)}
                    className={`rounded-l-xl shadow-sm w-[50%] h-10 flex justify-center items-center cursor-pointer 
                        ${forYou ? "bg-red-400 text-white" : "bg-white text-black"}
                    `}
                >
                    For You
                </div>

                {/* "Trending" Button */}
                <div
                    onClick={() => setForYou(false)}
                    className={`rounded-r-xl shadow-sm w-[50%] h-10 flex justify-center items-center cursor-pointer 
                        ${!forYou ? "bg-red-400 text-white" : "bg-white text-black"}
                    `}
                >
                    Trending
                </div>
            </div>

            <div className={"flex flex-col gap-5"}>

                {!forYou && Trendingposts.map((post, index) => (
                    <Post key={index} {...post} />
                ))}

                {forYou && Userposts.map((post, index) => (
                    <Post key={index} {...post} />
                ))}
            </div>
        </div>
    );
}
