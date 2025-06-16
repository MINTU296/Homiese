'use client';
import {useForm} from "react-hook-form"
import signUpSchema from '@/formSchema/signUpPage';
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Link from "next/link";
import {apiClient} from "@/lib/api-client";
import {API_SIGNUP_URL} from "@/utils/constants";
import {useState, useTransition} from "react";
import {useRouter} from "next/navigation";
import { Progress } from "@/components/ui/progress"



export default function SignupPage() {

  const [loading , setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>(
      {
        resolver : zodResolver(signUpSchema),
        defaultValues : {
            firstname: "",
            lastname: "",
              username : "",
              email : "",
              password: "",
              confirmPassword: "",
        }
      }
  );

  async function onSubmit(values : z.infer<typeof signUpSchema>) {
      setLoading(true);
      setProgress(33);
      try{
        console.log("onSubmit " , API_SIGNUP_URL)
        await apiClient.post(API_SIGNUP_URL , {
            firstname : values.firstname,
            lastname : values.lastname,
            username : values.username,
            email : values.email,
            password: values.password,
        }, {
            withCredentials: true
        });

          setProgress(66);
          setTimeout(() => {
              setProgress(100);

              setTimeout(() => {
                  startTransition(() => {
                      router.push("/");
                  });
                  setLoading(false);
              }, 100);

          }, 1000)

    }
    catch(error){
      console.log(error);
    } finally {
          setProgress(100);
          setLoading(false);
      }
  }
  return (
    <main className={"h-[100vh] bg-gray-100 flex justify-center items-center "}>
        {
            loading ?
                <div className="bg-white p-12 border-none rounded-lg shadow-lg w-96 ">
                    <Progress value={progress} className="transition-all duration-1000 ease-in-out" />
                </div>
                :
            <div className={"bg-white p-8 rounded-lg shadow-lg w-96  "}>
                <h2 className="text-2xl font-semibold text-center mb-6 text-black">Sign Up To Homiese</h2>

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-1"}>
                        <FormField
                            name={"username"}
                            control ={form.control}
                            render = {({field}) =>(

                                <FormItem>
                                    <FormLabel>
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input type={"string"} {...field}/>
                                    </FormControl>
                                    <FormDescription >

                                    </FormDescription>
                                    <FormMessage>

                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={"firstname"}
                            control ={form.control}
                            render = {({field}) =>(

                                <FormItem>
                                    <FormLabel>
                                        Firstname
                                    </FormLabel>
                                    <FormControl>
                                        <Input type={"string"} {...field}/>
                                    </FormControl>
                                    <FormDescription >

                                    </FormDescription>
                                    <FormMessage>

                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={"lastname"}
                            control ={form.control}
                            render = {({field}) =>(

                                <FormItem>
                                    <FormLabel>
                                        Lastname
                                    </FormLabel>
                                    <FormControl>
                                        <Input type={"string"} {...field}/>
                                    </FormControl>
                                    <FormDescription >

                                    </FormDescription>
                                    <FormMessage>

                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormField name={"email"} control = {form.control}
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel>
                                               Email
                                           </FormLabel>
                                           <FormControl>
                                               <Input type={"email"} {...field}/>
                                           </FormControl>
                                           <FormDescription />
                                           <FormMessage />
                                       </FormItem>
                                   )} />


                        <FormField name={"password"} control = {form.control}
                                   render={({field})=>(
                                       <FormItem>
                                           <FormLabel>
                                               Password
                                           </FormLabel>
                                           <FormControl>
                                               <Input type={"password"} {...field}/>
                                           </FormControl>
                                           <FormDescription />
                                           <FormMessage />
                                       </FormItem>
                                   )} />


                        <FormField control={form.control} name={"confirmPassword"}
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel>
                                               Confirm Password
                                           </FormLabel>
                                           <FormControl>
                                               <Input type={"password"} {...field}/>
                                           </FormControl>
                                           <FormDescription />
                                           <FormMessage />
                                       </FormItem>
                                   )}
                        />

                        <Button type="submit" variant="outline" disabled={loading || isPending}>
                            Submit
                        </Button>
                    </form>
                </Form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        }
    </main>
  );
}
