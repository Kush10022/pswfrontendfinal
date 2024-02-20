export async function registerUsers(email, password, firstName, lastName, PSW) {
    // console.log("will send:",email, password, firstName, lastName, PSW);

    const payload = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        PSW: PSW
    };

    try {
        // Modify this URL to the actual endpoint UJ Path
        //http://localhost:8080/v1
        const response = await fetch('https://tired-rose-sockeye.cyclic.app/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( payload)
        });
        const responseData = await response.json();
        //const responseData = await response.text();
        //console.log(responseData);
        if (response.ok) {
            console.log('User registration successful', responseData);
            return responseData;
        } else {
            console.log('User registration failed', responseData);
            return responseData;
        }
    } catch (error) {
        console.error('Error during user registration', error);
    }

}


// In this useEffect, we use an interval to control the character-by-character display and removal of words. Here's a step-by-step breakdown:
// If the word is not fully displayed (!isWordDisplayed) and we haven't reached the end of the current word (currentIndex < currentWord.length), we add the current character to the displayText and increment the currentIndex.
// If the word is not fully displayed, and we have reached the end of the current word, we set isWordDisplayed to true. This indicates that the current word is fully displayed.
// If isWordDisplayed is true, we clear the interval using clearInterval(intervalId). Then, we reset isWordDisplayed to false and use setTimeout to wait for 500ms before performing the following actions:
// Clear the displayText.
// Reset currentIndex to 0.
// Update currentWordIndex to move to the next word in the words array (with wrapping around to the first word using (prevIndex + 1) % words.length).
// Here, we return a cleanup function that clears the interval when the component unmounts or when any of the dependencies
// (currentWord, currentIndex, currentWordIndex, isWordDisplayed, words) change.