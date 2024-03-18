"use client";


import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { validatePasswordResetToken } from "../lib/authenticateToken";
import { Suspense } from 'react';


async function Validate(token){
  
    const router = useRouter();
     
      try{
        const response = await validatePasswordResetToken(token);
        //const responseData = await response.json();
        console.log(`response is ${response}`)
        if (response == true){
        router.push(`/newpassword?token=${token}`);
        }
        else{
          router.push(`/resetPassword`);
        }
       
       
    } catch (err) {
      console.log(err)
      router.push(`/resetPassword`);
    }
      

}


function GetQuery() {
  
  //const [message, setMessage] = useState("Loading...")
  const searchParams = useSearchParams()
  const mytoken = searchParams.get('token');
  console.log(mytoken);
  Validate(mytoken);


  return( <>  
  <h1>Loading....</h1>
  </>)

}




export default function PasswordReset() {
  
  
    return (<>
   
   <Suspense>
    <GetQuery/>    
   </Suspense>
    </>)

}




