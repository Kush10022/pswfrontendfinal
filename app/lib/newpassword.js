

export async function newPasswordResetting(token, password) {
    const url =  `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/passwordreset`;
    const payload = {
        "token": token,
        "password": password,
    }

    try {

    const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/passwordreset`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( payload)
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log('User password change successful', responseData);
            return responseData;
        } else {
            console.log('User password change failed', responseData);
            return responseData;
        }
    }catch(error){
        console.error('Error during user password change', error);
    }



//   try {
//     const response = await axios.patch('https://tired-rose-sockeye.cyclic.app/v1/auth/passwordreset', {
//       token,
//       password
//     });
//     console.log(`token is : ${token}`);
//     console.log(`password is : ${password}`);
//     console.log(response.data)
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       return { status: 'error', error: { code: error.response.status, message: error.response.data.message } };
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error('No response received:', error.request);
//       return { status: 'error', error: { message: 'No response received from server' } };
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error('Error setting up the request:', error.message);
//       return { status: 'error', error: { message: 'Error setting up the request' } };
//     }
//   }
}
