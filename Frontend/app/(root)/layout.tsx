"use client";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/Components/navbar";
import SideBar from "@/app/Components/sidebar";
import {useAppStore} from "@/store";
import {apiClient} from "@/lib/api-client";
import {API_GET_USER} from "@/utils/constants";


export default function Layout({ children }: { children: React.ReactNode }) {
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const {userInfo , setUserInfo} = useAppStore();
    const [loading ,setLoading] = useState<boolean>(userInfo === undefined);
    const router = useRouter();

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            setShowSearch(false); // Hide modal
            router.push(`/college-Info?page=${encodeURIComponent(searchQuery)}`); // Pass search query via URL
        }
    };



    useEffect(() => {
        if(!userInfo){
            const fetchUser = async () => {
                try {
                    const response = await apiClient(API_GET_USER, { withCredentials: true });
                    setUserInfo(response.data.user);
                    setLoading(false);
                } catch (e) {
                    console.log("Hello");
                    router.push("/login");
                }
            };

            fetchUser();

        }
    }, []);

    console.log(userInfo);
    return (
        <div className={"h-[100vh] bg-gray-100 flex justify-center items-center"}>

            {
                loading  ? (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-lg font-medium">Loading ...</p>
                    </div>
                ) :  (
                    <div className="flex h-screen flex-1 overflow-auto bg-gray-200 relative">
                        <div className="w-[250px] z-20 fixed h-full bg-white shadow-lg">
                            <SideBar onCollegeInfoClick={() => setShowSearch(true)} />
                        </div>

                        <div className={`flex-1 transition-all duration-300 ${showSearch ? "blur-md" : ""}`}>
                            <div className="fixed top-0 right-0 w-full bg-white shadow-md z-10">
                                <Navbar userName={ userInfo.username} />
                            </div>

                            <main className="flex-1 p-4 mt-[60px] ml-[250px]">{children}</main>
                        </div>

                        {showSearch && (
                            <div className="fixed inset-0 bg-gray bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
                                    <h2 className="text-xl font-bold mb-4 text-gray-600">Enter College Name</h2>
                                    <input
                                        type="text"
                                        placeholder="Search college..."
                                        className="w-full h-[60px] p-4 border rounded-2xl shadow-lg outline-none text-blue-600 text-xl"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
                                    />

                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="bg-gray-300 px-4 py-2 rounded mr-2"
                                            onClick={() => setShowSearch(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                            onClick={handleSearch}
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }


        </div>
    );
}
