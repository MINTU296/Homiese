"use client";

import MentorDisplay from "@/app/Components/mentorDisplay";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { apiClient } from "@/lib/api-client";
import { API_GET_DETAILS, API_GET_USER } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface Mentor {
    _id: string;
    firstname: string;
    lastname: string;
    description: string;
    batch: number;
    course: string;
    email: string;
    collegeName: string;
}

export default function MentorPage({
                                       collegeName,
                                   }: {
    collegeName: string;
}) {
    const { userInfo, setUserInfo } = useAppStore();
    const [loading, setLoading] = useState<boolean>(userInfo === undefined);
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const router = useRouter();


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiClient(API_GET_USER, {
                    withCredentials: true,
                });
                setUserInfo(response.data.user);
                setLoading(false);
            } catch (e) {
                router.push("/login");
            }
        };

        if (!userInfo) fetchUser();
    }, []);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await apiClient.post(
                    API_GET_DETAILS,
                    { collegeName },
                    { withCredentials: true }
                );
                setMentors(response.data.mentors);
            } catch (e) {
                console.error("Error fetching mentors:", e);
            }
        };

        fetchMentors();
    }, [collegeName]);


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-medium">Loading ...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-4">
            {mentors.map((mentor, index) => (
                <MentorDisplay
                    key = {index}
                    id={mentor._id}
                    name={`${mentor.firstname} ${mentor.lastname}`}
                    batch={mentor.batch}
                    description={mentor.description}
                    course = {mentor.course}
                />
            ))}
        </div>
    );
}
