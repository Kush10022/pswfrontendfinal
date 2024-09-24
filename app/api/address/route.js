import { NextRequest, NextResponse } from "next/server";

function transformData(data) {
  // Initialize an empty array to store the transformed data
  const transformedData = [];

  let index = 1;

  // Iterate through each item in the 'results' array
  data.forEach((item) => {
    // Extract relevant information
    const displayString = item.properties?.full_address || "";
    const name = item.properties?.name_preferred || "";
    const latitude = item.properties?.coordinates?.latitude;
    const longitude = item.properties?.coordinates?.longitude;
    const context = item.properties?.context || {};
    const country = context.country?.name || "";
    const countryCode = context.country?.country_code || "";
    const state = context.region?.name || "";
    const stateCode = context.region?.region_code || "";
    const postalCode = context.postcode?.name || "";
    const city = context.place?.name || "";
    const neighborhood = context.neighborhood?.name || "";
    const street = context.address?.name || "";

    // Construct transformed object with default values
    const transformedItem = {
      id: `${index++}`,
      displayString,
      name,
      coordinates: {
        latitude: latitude || undefined,
        longitude: longitude || undefined,
      },
      country,
      countryCode,
      state,
      stateCode,
      postalCode,
      city,
      neighborhood,
      street,
    };

    // Push transformed object into the array
    transformedData.push(transformedItem);
  });

  // Return the transformed data
  return transformedData;
}

// Get Request for /api/address
/**
 * @param {NextRequest} req
 * @param {NextResponse} res
 */

async function GET(req, res) {
  const defaultLimit = 10; // default limit for number of results
  const defaultLocation = {
    latitude: 43.64705181574289,
    longitude: -79.38641434606802,
  };
  const requestUrl = new URL(req.url);
  try {
    const q = requestUrl.searchParams.get("q");
    const location = requestUrl.searchParams.get("location");

    if (!q) {
      return NextResponse.json({ message: "Query is required" });
    }

    const qry = encodeURIComponent(q);
    const loc = encodeURIComponent(
      location || `${defaultLocation.longitude},${defaultLocation.latitude}`
    );

    const uri = `https://api.mapbox.com/search/geocode/v6/forward?q=${qry}&country=ca&limit=${defaultLimit}&proximity=${loc}&language=en&access_token=${process.env.NEXT_PUBLIC_MAP_BOX_API_KEY}`;

    const response = await fetch(uri);
    const data = await response.json();

    const transformedData = transformData(data.features);

    return NextResponse.json(transformedData);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export { GET };