import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsChevronDoubleDown } from "react-icons/bs";
import { BsChevronDoubleUp } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { sendMovieIdforSpecificToRedux } from "../actions";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import "../css/ballon.css";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

function Ratings() {
  const [pageState, setPageState] = useState({ activePage: 1 });

  const dispatch = useDispatch();

  const [ratings, setRatings] = useState("");
  const [descending, setDescending] = useState(false);
  const [minCount, setMinCount] = useState(0);
  const [movieData, setMovieData] = useState("");
  const [pages, setPages] = useState(1);

  //const dev_uri = "http://localhost:5000";
  const prod_uri = "https://tapesnippets.herokuapp.com"

  const ratingsCount = [
    { label: "1🙂", value: 1 },
    { label: "2😎", value: 2 },
    { label: "3😎", value: 3 },
    { label: "4😎", value: 4 },
    { label: "5😎", value: 5 },
    { label: "10😁", value: 10 },
    { label: "100🤩", value: 100 },
    { label: "500🤩", value: 500 },
    { label: "1000✨", value: 1000 },
  ];

  function filterHandle(event) {
    const value = parseInt(event.target.value);

    setMinCount(value);

    setPageState({ activePage: 1 });
  }

  function changeDescending() {
    setDescending(!descending);
    setPageState({ activePage: 1 });
  }

  function handlePageChange(pageNumber) {
    //console.log(`curent Ratings page: ${pageNumber}`);
    setPageState({ activePage: pageNumber });
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios({
      method: "post",
      url: `${prod_uri}/ratings`,
      data: {
        descending: descending,
        minCount: minCount,
        pagina: pageState.activePage,
      },
      headers: {
        authToken: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //console.log("ratings", res.data.ratings);
        setRatings(res.data.ratings);

        res.data.pages[0] && setPages(res.data.pages[0].totalFields);
      })
      .catch((err) => console.log(err));
  }, [descending, minCount, pageState.activePage]);

  //make axios call to tmdb for that movieId
  useEffect(() => {
    setMovieData("");

    ratings &&
      ratings.length > 0 &&
      ratings.map((item) =>
        axios({
          method: "post",
          url: `${prod_uri}/specificmovie`,
          data: {
            movieId: item._id,
          },
          headers: {
            //authToken: localStorage.getItem("authToken"),
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            setMovieData((movieData) => [...movieData, res.data]);
          })
          .catch((err) => {
            console.log(err);
          })
      );
  }, [ratings]);

  //send MovieId To SpecificMovie Component
  function sendId(event) {
    const value = event.currentTarget.getAttribute("value");
    dispatch(sendMovieIdforSpecificToRedux(value));
    localStorage.setItem("movieId", value);
  }

  document.body.style.backgroundColor = "white";

  return (
    <div className="rm">
       <Helmet>
        <title>TapeSnippets - Movie Ratings</title>
        <meta name="description" content="Sort and filter movies by their ratings and a minimum vote count" />
      </Helmet>
      <h1 className="text-align-center">Ratings</h1>
      <div className="minheight3 review-bg">
        <div className="text-align-center reviews-sort-bar">
          Sort:
          <span className="sort-icon" onClick={changeDescending}>
            {descending === false ? (
              <BsChevronDoubleDown size="1.2em" />
            ) : (
              <BsChevronDoubleUp size="1.2em" />
            )}
          </span>
          Minimum Votes Number:
          <select
            onChange={filterHandle}
            value={minCount}
            className="round-inbox-borders"
          >
            <option value="0">Min Votes</option>
            {ratingsCount.map((rating) => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>
        </div>
        <div className="container-to-reduce-on-pc-screen-size">
          <div className="watch-list-parent">
            {movieData.length > 0 &&
              ratings.length > 0 &&
              ratings.map((item) => (
                <div className="watch-list-child" key={item._id}>
                  {movieData.length > 0 &&
                    movieData.map((movieDataItem) =>
                      movieDataItem.id.toString() === item._id ? (
                        <Link
                          to="/SpecificMovie"
                          key={movieDataItem.id + "md"}
                          aria-label={
                            "Votes: " +
                            item.count +
                            " Rating: " +
                            item.avgRating.toFixed(2)
                          }
                          data-balloon-pos="down"
                        >
                          {movieDataItem.poster_path !== null ? (
                            <img
                              value={movieDataItem.id}
                              onMouseDown={sendId}
                              className="rating-poster"
                              src={
                                "https://image.tmdb.org/t/p/w92" +
                                movieDataItem.poster_path
                              }
                              alt="poster"
                            />
                          ) : (
                            <img
                              value={movieDataItem.id}
                              onMouseDown={sendId}
                              className="rating-poster"
                              src={
                                "https://dummyimage.com/92x138/000/ffffff.jpg&text=" +
                                movieDataItem.original_title
                              }
                              alt="poster"
                            />
                          )}
                        </Link>
                      ) : null
                    )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="ratings-pag">
        <span className="centered-pagination">
          {/*30 is item per page*/}
          <Pagination
            activePage={pageState.activePage}
            itemsCountPerPage={1}
            totalItemsCount={Math.ceil(pages / 30)}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            //for bootstrap 4 stilyng
            itemClass="page-item"
            linkClass="page-link"
          />
        </span>
      </div>
      <Footer/>
    </div>
  );
}

export default Ratings;
