
export async function validatePasswordResetToken(token) {
    try {
       
        const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/passwordreset?token=${token}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseData = await response.json();
        
        if (response.ok) {
            console.log(`The token is valid ! `);
            // Perform further actions if needed
        } else {
            console.log('Token is invalid', responseData);
            // Handle invalid token case
        }
    } catch (error) {
        console.error('Error validating password reset token', error);
        // Handle error case
    }
  }
  
  









