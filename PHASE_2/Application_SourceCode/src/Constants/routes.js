// Define components for each page
export { default as Home } from "../Pages/Home";
export { default as Result } from "../Pages/Result";
export { default as Covidcase } from "../Pages/Covidcase";
export { default as Disease } from "../Pages/Disease";

// Define the path name for each component
export const HOME = "/home";
export const RESULT = "/result/:start/:end/:country/:city/:keyword";
export const COVIDCASE = "/covidcase";
export const DISEASE = "/disease";
