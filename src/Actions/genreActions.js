import {
  GENRE_LIST_REQUEST,
  GENRE_LIST_SUCCESS,
  GENRE_LIST_FAIL,
  GENRE_PRODUCTS_REQUEST,
  GENRE_PRODUCTS_SUCCESS,
  GENRE_PRODUCTS_FAIL,
  GENRE_ADD_REQUEST,
  GENRE_ADD_SUCCESS,
  GENRE_ADD_FAIL,
} from "../Constants/genreConstants";
import axios from "axios";

export const listGenres = () => async (dispatch) => {
  try {
    dispatch({
      type: GENRE_LIST_REQUEST,
    });

    const { data } = await axios.get("https://scriptinkbk.pythonanywhere.com/api/genres"); 

    dispatch({
      type: GENRE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENRE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listGenreProducts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GENRE_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(`https://scriptinkbk.pythonanywhere.com/api/genreproducts/${id}`);

    dispatch({
      type: GENRE_PRODUCTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GENRE_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addGenre = (genre) => async (dispatch) => {
  try {
    dispatch({
      type: GENRE_ADD_REQUEST,
    });

    const { data } = await axios.post(`https://scriptinkbk.pythonanywhere.com/api/genres/create`, genre); //create a new product

    dispatch({
      type: GENRE_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENRE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
