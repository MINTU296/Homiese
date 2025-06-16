'use client'

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import loginSchema from "@/formSchema/loginPage";
import { useRouter } from "next/navigation";
import {API_LOGIN_URL} from "@/utils/constants";
import {apiClient} from "@/lib/api-client";

export default function LoginPage (){

    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
          resolver : zodResolver(loginSchema),
        defaultValues : {
            email : "",
            password: "",
        }
      })

    async function onSubmit(values : z.infer<typeof loginSchema>){
      try{
        const response = await apiClient.post(API_LOGIN_URL , {
            email: values.email,
            password: values.password
        }, {
            withCredentials : true
        });

        console.log(response);

        if(response.status === 201){
            router.push("/");
        }
        else if(response.status === 200){
            alert("User doesn't exists!");
        }
      }
      catch(error){
            alert("User doesn't exists!");
            console.log(error)
      }
    }

  return(
      <main className={"h-[100vh] bg-gray-100 flex justify-center items-center "}>
        <div className={"bg-white p-8 rounded-lg shadow-lg w-96  "}>
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">Login</h2>

        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-1"}>



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




            <Button type="submit" variant="outline" >
              Submit
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-gray-600 mt-4">
            Don&#39;t have an account?  <span onClick={() => {router.push("/signup")}} className="text-blue-500 hover:underline cursor-pointer">Sign Up</span>
        </p>
      </div>
      </main>
  )
}
