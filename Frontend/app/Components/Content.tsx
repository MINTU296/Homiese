
'use client'

import { useState } from 'react'
import Post from '@/app/Components/Post'
import CreatePost from '@/app/Components/CreatePost'

type PostType = {
    ContentDescription:  string
    ContentImage:        boolean
    ContentPostedBy:     string
    ContentProfileImage: string
    ContentTitle:        string
    ContentLiked:        number
    ContentImagePath:    string
}

export default function Content() {
    // 1) toggle state
    const [forYou, setForYou] = useState<boolean>(true)

    // 2) feed state for "For You"
    const [userPosts, setUserPosts] = useState<PostType[]>([
        {
            ContentDescription:
                'Top Mistakes to Avoid When Choosing a College:\nIgnoring Location: Distance, weather, and job opportunities can impact your experience more than you expect..',
            ContentImage: true,
            ContentPostedBy: 'Deepesh',
            ContentProfileImage: '/UserImg.svg',
            ContentTitle: 'TOP Mistakes I did while choosing the college',
            ContentLiked: 26,
            ContentImagePath: '/post_image.jpeg',
        },
        {
            ContentTitle: 'How to Make the Best Use of College Life',
            ContentDescription:
                'Get involved in clubs, build strong networks, explore internships, and develop valuable skills beyond academics. These years can shape your future!',
            ContentImage: true,
            ContentPostedBy: 'Ashish Bargoti',
            ContentProfileImage: '/UserImg.svg',
            ContentLiked: 87,
            ContentImagePath: '/collegeLife.jpg',
        },
        {
            ContentTitle: 'Ask a Question',
            ContentDescription:
                'Is it true that IITD is more research focused than any other JAC colleges',
            ContentImage: false,
            ContentPostedBy: 'Ashish Bargoti',
            ContentProfileImage: '/UserImg.svg',
            ContentLiked: 87,
            ContentImagePath: '',
        },
    ])

    // 3) static trending posts
    const trendingPosts: PostType[] = [
        {
            ContentDescription: 'This is a trending page',
            ContentImage: true,
            ContentPostedBy: 'You',
            ContentProfileImage: '/UserImg.svg',
            ContentTitle: 'Leader OP',
            ContentLiked: 26,
            ContentImagePath: '/contentImage.svg',
        },
        {
            ContentDescription: 'React is awesome!',
            ContentImage: false,
            ContentPostedBy: 'John Doe',
            ContentProfileImage: '/UserImg.svg',
            ContentTitle: 'Why React Rocks',
            ContentLiked: 102,
            ContentImagePath: '',
        },
    ]

    // 4) handler to add a new post
    const handleNewPost = (description: string) => {
        const newPost: PostType = {
            ContentDescription: description,
            ContentImage: false,
            ContentPostedBy: 'You',
            ContentProfileImage: '/UserImg.svg',
            ContentTitle: 'My Post',
            ContentLiked: 0,
            ContentImagePath: '',
        }
        // prepend so it appears at top
        setUserPosts(prev => [newPost, ...prev])
        setForYou(true) // switch to "For You" if not already
    }

    return (
        <div className="flex flex-col">
            {/* —————— Create Post Box —————— */}
            <CreatePost onSubmit={handleNewPost} />

            {/* —————— Toggle Buttons —————— */}
            <div className="flex items-center justify-center py-4">
                <div
                    onClick={() => setForYou(true)}
                    className={`w-1/2 h-10 flex items-center justify-center cursor-pointer rounded-l-xl shadow-sm
            ${forYou ? 'bg-red-400 text-white' : 'bg-white text-black'}`}
                >
                    For You
                </div>
                <div
                    onClick={() => setForYou(false)}
                    className={`w-1/2 h-10 flex items-center justify-center cursor-pointer rounded-r-xl shadow-sm
            ${!forYou ? 'bg-red-400 text-white' : 'bg-white text-black'}`}
                >
                    Trending
                </div>
            </div>

            {/* —————— Feed —————— */}
            <div className="flex flex-col gap-5 overflow-y-auto">
                {forYou
                    ? userPosts.map((post, i) => <Post key={i} {...post} />)
                    : trendingPosts.map((post, i) => <Post key={i} {...post} />)}
            </div>
        </div>
    )
}
