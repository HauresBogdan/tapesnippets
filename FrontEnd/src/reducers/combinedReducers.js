import {combineReducers} from 'redux';
import isLoggedReducer from './islogged';
import filterReducer from './filterReducer';
import paginationReducer from "./paginationReducer";
import movieIdForSpecificReducer from './movieIdForSpecificReducer';
import searchTermReducer from './searchTermReducer';

const allReducers = combineReducers({
    isLogged : isLoggedReducer,
    filter: filterReducer,
    pageStateFromRedux: paginationReducer,
    movieIdForSpecific: movieIdForSpecificReducer,
    searchTermFromRedux: searchTermReducer
});

export default allReducers;


