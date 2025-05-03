"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


import updateSchema from "@/formSchema/updatePage";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import {API_GET_USER, API_UPDATE_DETAILS} from "@/utils/constants";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UpdateDetails() {
    const { userInfo, setUserInfo } = useAppStore();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(userInfo === undefined);

    const form = useForm<z.infer<typeof updateSchema>>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            username: userInfo?.username || "",
            firstname: userInfo?.firstname || "",
            lastname: userInfo?.lastname || "",
            email: userInfo?.email || "",
            roleChange: 0,
            role: userInfo?.role || "",
            collegeName: userInfo?.collegeName || "",
            description: userInfo?.description || "",
            batch : userInfo?.batch.toString() || "2026",
            course : userInfo?.course || "",
        }
    });

    const { watch, setValue } = form;
    const role = watch("role");

    const toggleRole = () => {
        const roles = ["Student", "Mentor", "Explorer"];
        const currentIndex = roles.indexOf(role);
        const nextRole = roles[(currentIndex + 1) % roles.length];
        setValue("role", nextRole);
    };

    const onSubmit = async (values: z.infer<typeof updateSchema>) => {
        console.log(values);
        try{
            const response = await apiClient.put(API_UPDATE_DETAILS , {
                id : userInfo.id ,
                firstname: values.firstname,
                lastname: values.lastname,
                email : values.email,
                role : values.role,
                batch : values.batch,
                course : values.course,
                collegeName : values.collegeName,
                description : values.description,
            }, {
                withCredentials: true
            })

            console.log(response);
            router.push("/profile")
        }
        catch(e){
            console.log(e);
        }
    };
    const currentYear = new Date().getFullYear();
    const batchYears = Array.from({ length: 9 }, (_, i) => currentYear - 4 + i);


    useEffect(() => {
        if (!userInfo) {
            const fetchUser = async () => {
                try {
                    const response = await apiClient(API_GET_USER, { withCredentials: true });
                    setUserInfo(response.data.user);
                } catch (e) {
                    console.error(e);
                    router.push("/login");
                }
                setLoading(false);
            };

            fetchUser();
        }


        console.log(userInfo);
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
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="font-bold text-center text-3xl mb-6">
                    <span className="text-red-500">Update</span> Details
                </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-xl">
                    {/* Username */}
                    <FormField
                        name="username"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Firstname */}
                    <FormField
                        name="firstname"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Firstname</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Lastname */}
                    <FormField
                        name="lastname"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lastname</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter description..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Role Toggle */}
                    <div className="mt-4 flex gap-4 justify-between items-center">
                        <p className="mb-2">Current Role: <strong>{role}</strong></p>
                        <div
                            onClick={toggleRole}
                            className="rounded-xl shadow-sm w-[34%] h-10 flex justify-center items-center cursor-pointer bg-red-400 text-white"
                        >
                            Click to switch role
                        </div>
                    </div>

                    {/* College Name - only for Mentors */}
                    {role === "Mentor" && (

                        <>
                        <FormField
                            name="collegeName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="mt-4 flex justify-between ">
                                    <FormLabel className={"text-md font-normal"}>College Name</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value }

                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your college" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="IIIT Delhi">IIIT Delhi</SelectItem>
                                            <SelectItem value="DTU">DTU</SelectItem>
                                            <SelectItem value="NSUT">NSUT</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <FormField
                                name="batch"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className={"mt-4 flex justify-between"}>
                                        <FormLabel
                                        className={"text-md font-normal"}>Batch</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select batch year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {batchYears.map((year) => (
                                                    <SelectItem key={year} value={year.toString()}>
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="course"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="mt-4 flex justify-between ">
                                        <FormLabel className={"text-md font-normal"}>Course</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your course" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="CSAI">CSAI</SelectItem>
                                                <SelectItem value="CSE">CSE</SelectItem>
                                                <SelectItem value="ECE">ECE</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </>

                )}


                    <div className={"flex justify-center"}>
                        <Button type="submit" variant="outline" className="mt-6">
                                Submit
                        </Button>
                    </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
