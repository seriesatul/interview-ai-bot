"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const authFormSchema = (type: FormType) =>{
      return z.object({
        name :type === 'sign-up' ? z.string().min(3): z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
      })
}


const AuthForm = ({type}:{type: FormType }) => {
  const router = useRouter();
    const formSchema = authFormSchema(type);


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     name:"",
     email:"",
     password:"",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
   try{
    if(type === 'sign-up'){
      toast.success('Accont Created Successfully!!');
      router.push('/sign-in');
        console.log('SIGN UP', values);
    }
    else{
        console.log('SIGN IN', values);
         toast.success('Signed in Successfully!!');
      router.push('/');
    }
   }
   catch(error){
    console.log(error);
    toast.error(`Error Occured: ${error}`)

   }
    console.log(values)
  }

  const isSignIn = type === "sign-in"


  return (
    <div className="card-border lg:min-w-[566px]"> 
    <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
            <Image src = './logo.svg' alt="logo" height={32} width={38}/>
            <h2 className="text-primary-100">PrepMate AI</h2>
            
        </div>
         <h3 className="text-xl">Practice with Precision. Perform with Confidence.</h3>
    </div>
   
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full mt-4 space-y-6 form">

       {!isSignIn && (
         <FormField
           control={form.control}
           name="name"
           render={({ field }) => (
             <FormItem>
               <FormLabel className="px-2">Name</FormLabel>
               <FormControl>
                 <input {...field} placeholder="Enter Your Name" className="input" />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
       )}
       <FormField
           control={form.control}
           name="email"
           render={({ field }) => (
             <FormItem>
               <FormLabel className="px-2">Email</FormLabel>
               <FormControl>
                 <input {...field} placeholder="Enter Your Email" type="" className="input" />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
       <FormField
           control={form.control}
           name="password"
           render={({ field }) => (
             <FormItem>
               <FormLabel className="px-2">Password</FormLabel>
               <FormControl>
                 <input {...field} placeholder="Enter Your Password" className="input" />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
   
        <Button className="btn" type="submit">{isSignIn ? "Sign In" :"Create an Account"}</Button>
      </form>
    </Form>

  
     <p className="text-center text-white">
      {isSignIn ? "Not a Registered Account yet?" : "Have an Account already?"}
      <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-zinc-50 ml-2">
        {!isSignIn ? "Sign in" : "Sign up"}
      </Link>
    </p>



   
    

    </div>
  )
}

export default AuthForm