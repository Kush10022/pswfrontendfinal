const AssitiveFetch = async (pathReceived, methodReceived, payloadReceived) => {
  const response = await fetch(pathReceived, {
    method: methodReceived,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloadReceived),
  });
  const responseData = await response.json();
  return responseData;
};

const loginUsers = async(email, password) => {
    const payload ={
        email: email,
        password: password
    }

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        const responseData = await response.json();
        if (response.ok) {
            console.log('User registration successful', responseData);
            return responseData;
        } else {
            console.log('User registration failed', responseData);
            return responseData;
        }

    }catch(error){
        console.log('Error during login', error)
    }
}


export {
    AssitiveFetch,
    loginUsers
}