import {
    TIER_LIST_REQUEST,
    TIER_LIST_SUCCESS,
    TIER_LIST_FAIL,
    TIER_PRODUCTS_REQUEST,
    TIER_PRODUCTS_SUCCESS,
    TIER_PRODUCTS_FAIL,
  } from "../Constants/tierConstants";
  import axios from "axios";
  
  export const tierListReducer = (state = { loading: true, tiers: [] }, action) => {
    switch (action.type) {
      case TIER_LIST_REQUEST:
        return { loading: true, tiers: [] };
      case TIER_LIST_SUCCESS:
        return { loading: false, tiers: action.payload };
      case TIER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const tierProductsReducer = (state = { loading: true, tierProducts: [] }, action) => {
    switch (action.type) {
      case TIER_PRODUCTS_REQUEST:
        return { loading: true, tierProducts: [] };
      case TIER_PRODUCTS_SUCCESS:
        return { loading: false, tierProducts: action.payload };
      case TIER_PRODUCTS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
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
        payload: data,
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
  