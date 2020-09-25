import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendPageToRedux } from "../actions";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from 'react-router-dom';

function MyPagination(props) {
  const dispatch = useDispatch();

  const location = useLocation();
 // const currentPath = location.pathname;


  const [pageState, setPageState] = useState( /* currentPath==="/Films" ? { activePage: parseInt(localStorage.getItem( 'page' )) || 1 } :*/ { activePage:  1 }) ;


  function handlePageChange(pageNumber) {
    //console.log(`active page is ${pageNumber}`);
    setPageState({ activePage: pageNumber });
    //localStorage.setItem( 'page', pageNumber );
   
  }

  useEffect(() => {
    dispatch(sendPageToRedux(pageState));
    // eslint-disable-next-line
  },[pageState]);

  useEffect(() => {
    dispatch(sendPageToRedux(pageState));
    // eslint-disable-next-line
  },[location.pathname]);

  return (
    <>
      <Pagination        
        activePage={pageState.activePage}
        itemsCountPerPage={1}
        totalItemsCount={props.totalItemsCount}
        pageRangeDisplayed={3}
        onChange={handlePageChange}
        //for bootstrap 4 stilyng
        itemClass="page-item"
        linkClass="page-link"
      />
    </>
  );
}

export default MyPagination;
