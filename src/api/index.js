import axios from "axios";
import Airtable from "airtable";

/**
 * ===================================
 * START OF AXIOS CONFIGURATION
 * ===================================
 */
const pipeDreamApi = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  timeout: 50000,
});

// Configure Airtable
const ciitMerchApi = new Airtable({
  apiKey: process.env.REACT_APP_APIKEY,
}).base(process.env.REACT_APP_APPID);

export { ciitMerchApi, pipeDreamApi };
