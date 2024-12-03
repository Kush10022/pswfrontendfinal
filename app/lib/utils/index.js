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

function constructSearchURL({ name, rate, day, radius, lat, lon }) {
    try {
      // Check if API URL is available
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      if (!baseURL) {
        throw new Error('API base URL is missing in environment variables.');
      }
  
      // Check for missing required parameters
      if (!day || !radius || !lat || !lon) {
        throw new Error('Missing required search parameters: day, radius, lat, or lon.');
      }
  
      // Construct the URL with query parameters
      const params = new URLSearchParams();
  
      // Add optional and required parameters
      if (name) params.append('name', name);
      if (rate) params.append('rate', rate);
      params.append('day', day);
      params.append('radius', radius);
      params.append('lat', lat);
      params.append('lon', lon);
  
      // Build the final URL
      const url = `${baseURL}/v1/private/search?${params.toString()}`;
      return url;
  
    } catch (error) {
      console.error('Error constructing search URL:', error.message);
      // Handle or return the error as necessary, e.g., show a notification or return null
      return null; // Return null if an error occurs
    }
  }
  

/**
 * Converts the array of booking objects into the required format for react-big-calendar
 * @param {Array} bookingsArray - The original array of booking objects
 * @param {string} userType - Either "PSW" or "Client"
 * @returns {Array} An array of calendar events
 */
const convertBookingsToEvents = (bookingsArray, userType) => {
  if (!bookingsArray) return [];
  return bookingsArray.map((booking) => {
    const { appointmentDate, client, psw, duration } = booking;

    // Convert appointmentDate to Date object
    const startDate = new Date(appointmentDate);
    const endDate = new Date(startDate.getTime() + duration * 60000); // Add duration (in minutes)

    return {
      id: booking._id,
      title:
        userType === "PSW"
          ? `Client: ${client.name} (${client.email})`
          : `PSW: ${psw.name} (${psw.email})`,
      start: startDate,
      end: endDate,
      details: {
        email: userType === "PSW" ? client.email : psw.email,
        name: userType === "PSW" ? client.name : psw.name,
        rate: userType === "PSW" ? psw.rate : client.rate,
        picture: userType === "PSW" ? client.picture : psw.picture,
        address: booking.address.fullAddress,
        location: booking.address.location.coordinates,
        document: psw.document,
        bookingId: booking.bookingId,
        status: booking.status,
        duration: booking.duration,
      },
    };
  });
};



export {
    AssitiveFetch,
    loginUsers,
    constructSearchURL,
    convertBookingsToEvents
}