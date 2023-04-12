import {
    GENRE_LIST_REQUEST,
    GENRE_LIST_SUCCESS,
    GENRE_LIST_FAIL,

    GENRE_PRODUCTS_REQUEST,
    GENRE_PRODUCTS_SUCCESS,
    GENRE_PRODUCTS_FAIL,

 } from "../Constants/genreConstants";

export const genreListReducer = (state = {genres:[]}, action) => {
    switch (action.type) {
        case GENRE_LIST_REQUEST:
            return {loading:true, genres: []};
        case GENRE_LIST_SUCCESS:
            return {loading:false, genres: action.payload};
        case GENRE_LIST_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};

export const genreProductsReducer = (state = {genre:[]}, action) => {
    switch (action.type) {
        case GENRE_PRODUCTS_REQUEST:
            return {loading:true, ...state};
        case GENRE_PRODUCTS_SUCCESS:
            return {loading:false, genre: action.payload};
        case GENRE_PRODUCTS_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};
