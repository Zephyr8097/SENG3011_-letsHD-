// Define configurations for the project
// Color schema
export const primaryColor = "#4dc1ee";
export const secondaryColor = "#fff";

// Feedback URL
export const feedbackLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSdXZ-4eDPrg0i2DLVd4akGI4MZ4D2ratZHBelfXsLb5z7k1VQ/viewform";

// Axios config headers
export const axiosHeader = {
  ContentType: "*",
  "Access-Control-Allow-Origin": "*",
};

// API root URL
// Our own backend API
// 1) key_term/{key_term}
// 2) covid/{country}
export const BACKEND = "http://18.188.162.122:8080";
// External public API
export const COVID = "https://api.covid19api.com";
// Other groups' API
export const DISEASE = "https://seng3011-dwen.herokuapp.com/diseases";
// Geocoder API
export const GEO = "https://maps.googleapis.com/maps/api/geocode/json?";

// Geocoding API key
export const GeoKey = "AIzaSyCm7uCvmCdq4tc6n7OMVDk51rkwSvM8G1g";
