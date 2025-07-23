import CryptoJS from "crypto-js";
import axios from "axios";

export default defineComponent({
  async run({ steps, $ }) {
    const API_KEY = "pk_test_10a8eaf3d9eeeada73d2cfe2580b14be";
    const SECRET =
      "sk_test_7OF6DSTRb9YqQZ6eOhAPrIpHEswLy8jGX6Nrs+oLby6y4c8Ok0hIOo+13cRlLUp2";
    const MARKET = "PH";
    const method = "POST";
    const path = "/v3/quotations";
    const timestamp = Date.now().toString();

    const bodyData = {
      serviceType: "MOTORCYCLE",
      language: "en_PH",
      stops: [
        {
          coordinates: { lat: "14.63204", lng: "121.03676" },
          address: "94 Kamuning Rd, Quezon City, Metro Manila, Philippines",
        },
        {
          coordinates: {
            lat: steps.trigger.event.body.lat,
            lng: steps.trigger.event.body.lng,
          },
          address: steps.trigger.event.body.address,
        },
      ],
    };

    const body = JSON.stringify({ data: bodyData });
    console.log("body", body);

    const rawSignature = `${timestamp}\r\n${method}\r\n${path}\r\n\r\n${body}`;
    const signature = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `hmac ${API_KEY}:${timestamp}:${signature}`,
      Market: MARKET,
      Accept: "application/json",
    };

    try {
      const response = await axios.post(
        `https://rest.sandbox.lalamove.com${path}`,
        body,
        { headers }
      );
      console.log("Lalamove response:", response.data);

      // ✅ Send to your React app
      await $.respond({
        status: 200,
        body: response.data,
      });
    } catch (err) {
      console.error("Lalamove error:", err.response?.data || err.message);

      // ❌ Send error back to frontend
      await $.respond({
        status: err.response?.status || 500,
        body: {
          error: true,
          message: err.response?.data || err.message,
        },
      });
    }
  },
});
