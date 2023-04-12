import {
  TIER_LIST_REQUEST,
  TIER_LIST_SUCCESS,
  TIER_LIST_FAIL,
  TIER_PRODUCTS_REQUEST,
  TIER_PRODUCTS_SUCCESS,
  TIER_PRODUCTS_FAIL,
} from "../Constants/tierConstants";
import axios from "axios";

export const listTiers = () => async (dispatch) => {
  try {
    dispatch({
      type: TIER_LIST_REQUEST,
    });

    const { data } = await axios.get("https://scriptinkbk.pythonanywhere.com/api/tiers"); 

    dispatch({
      type: TIER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TIER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTierProducts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TIER_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(`https://scriptinkbk.pythonanywhere.com/api/tierproducts/${id}`);

    dispatch({
      type: TIER_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TIER_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
