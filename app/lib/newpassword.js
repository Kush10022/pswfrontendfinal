
export async function resetPassword(token, newPassword) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/passwordreset`;
    const body = JSON.stringify({ token, password: newPassword });

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        });
        const responseData = await response.json();

        if (response.ok) {
            console.log(responseData.message);
            // Password reset was successful
        } else {
            console.error(responseData.error.message);
            // Handle error response
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        // Handle network errors or other unexpected errors
    }
}

