
// Function to initiate password reset
export async function initiatePasswordReset(email) {
    
        console.log(`The email sending is: ${email}`)
        const payload = {
            email: email
        };

        try {

            const response = await fetch('https://tired-rose-sockeye.cyclic.app/v1/auth/passwordreset',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( payload)
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(`User found and the res is ${responseData.stringify}`);
                return true;
                
            } else {
                console.log('User not found', responseData);
                return false;
            }
           
        }
         catch (error) {
            console.error('Error initiating password reset', error);
            return false;
            
        }
        
    
}

