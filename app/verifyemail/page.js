'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
//import { useRouter } from 'next/navigation'
// import { retreiveSendToken } from '../lib/retrieveToken'
import { useRouter } from 'next/navigation'
// URL -> `/dashboard?search=my-project`
// `search` -> 'my-project'

export default function Verification() {
    const searchParams = useSearchParams()
    //const [statusMessage, setStatusMessage] = useState('Verifying...');
    const router = useRouter()
    const token = searchParams.get('token')

    console.log(token)
    // const retreiveSendToken = async() => {
    //     try {
    //         //console.log("inside token page")
    //         if (token) {
    //             // Make a PATCH request to the API endpoint
    //             const response = await fetch(`https://tired-rose-sockeye.cyclic.app/v1/auth/verifyemail`, {
    //                 method: 'PATCH', // Use PATCH method for the request
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({token})
    //             })
    //             //console.log("inside fnc", token)
    //             //console.log(response)
    //             if (response.ok) {
    //                 const responseData = await response.json()
    //                 console.log("response is ", responseData)
    //                 //setStatusMessage('Your email has been successfully verified.');
    //                 router.push("/loginuser")
    //             } else {
    //                 setStatusMessage('Failed to verify email. Please register again.');
    //             }
    //         }
    //     } catch (error) {
    //         setStatusMessage('An error occurred. Please register again.');
    //     }
    // }
    //useEffect runs 2 in development mode. Turn of in next.config.mjs file. 
    useEffect(() => {
        //     // if (!token){
        //     //     console.log("token not found - useffect")
        //     //     router.push("/verifyfail")
        //     // }
        //     // console.log("i fire once")

        async function retreiveSendToken() {
            //const router = useRouter()
            // const elseMessage = "Failed to verify email. Please register again."
            // const catchMessage= "An error occurred. Please register again."

            // const [statusMessage, setStatusMessage] = useState('Verifying...');
            try {
                //console.log("inside token page")
                if (token) {
                    // Make a PATCH request to the API endpoint
                    const response = await fetch(`https://tired-rose-sockeye.cyclic.app/v1/auth/verifyemail`, {
                        method: 'PATCH', // Use PATCH method for the request
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token })
                    })
                    //console.log("inside fnc", token)
                    //console.log(response)
                    if (response.ok) {
                        const responseData = await response.json()
                        console.log("response is ", responseData)
                        //setStatusMessage('Your email has been successfully verified.');
                        router.push("/loginuser")
                    } else {
                        //elseMessage
                        //setStatusMessage('Failed to verify email. Please register again.');
                    }
                }
            } catch (error) {
                console.log('An error occurred. Please register again.')
                // setStatusMessage('An error occurred. Please register again.');
            }
        }

        retreiveSendToken()
    }, [token]);

    return (
        <>
            "Verifying..."
        </>
    )
}