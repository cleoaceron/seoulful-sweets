import { ciitMerchApi, pipeDreamApi } from "../../api";
import { CHECK_OUT_SERVICE } from "../constants";

class Checkout {
  fnPostPlaceOrderItems = async (payload) => {
    return await ciitMerchApi("OrderItems").create(payload);
  };

  fnPostPlaceOrder = async (payload) => {
    return await ciitMerchApi("Orders").create(payload);
  };

  fnGetQoutations = async (payload) => {
    return await pipeDreamApi.post(
      CHECK_OUT_SERVICE.PIPEDREAM_GET_QUOTATIONS,
      JSON.stringify(payload)
    );
  };
}

Checkout.api = new Checkout();

export default Checkout;
