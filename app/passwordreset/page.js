"use client";


import { useParams } from 'next/navigation'
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { validatePasswordResetToken } from "../lib/authenticateToken";
import { useState } from 'react';


async function validate(token){
  
    
     
      try{
        const response = await validatePasswordResetToken(token);
        
        
    } catch (err) {
      console.log(err)
    }
      

}


export default function PasswordReset() {

    const router = useRouter();
  const pathname = usePathname();
  
    const searchParams = useSearchParams();
    const token = searchParams.get('token')
    //const [isLoading, setIsLoading] = useState(true);

    const isValid = validate(token)
    
    if(isValid){
        router.push("/newpassword");
    }
    else {
        return <>
        <h1>
        Invalid Token
        </h1>
        </>
      
    }


    //const query = searchParams.get('token')
    // query is "hello" for /api/search?query=hello
    console.log(token)
    
    
}


















