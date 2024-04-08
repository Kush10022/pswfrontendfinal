export async function AssitiveFetch(pathReceived, methodReceived, payloadReceived) {
    const response = await fetch(pathReceived, {
        method: methodReceived,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadReceived)
    });
    const responseData = await response.json();
    console.log('responseData:', responseData);
    return responseData;
}