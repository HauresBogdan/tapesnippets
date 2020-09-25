import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import MyPagination from "./Pagination";
//import { v4 as uuidv4 } from "uuid";
import { IoIosCloseCircle } from "react-icons/io";
import { sendMovieIdforSpecificToRedux } from "../actions";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function WatchLater() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);
  const [watchLaterList, setWatchLaterList] = useState("");
  const page = useSelector((state) => state.pageStateFromRedux);
  const [movieId, setMovieId] = useState("");
  const [refresher, setRefresher] = useState(true);

  //const dev_uri = "http://localhost:5000";
  const prod_uri = "https://tapesnippets.herokuapp.com"

  function removeMovie(event) {
    const value = event.currentTarget.getAttribute("value");
    //console.log(value);
    //console.log("merge");
    setMovieId(value);
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `${prod_uri}/watchlaterList`,
      headers: {
        authToken: localStorage.getItem("authToken"),
      },
    })
      .then((res) => {
       // console.log(res.data);
        setWatchLaterList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresher]);

  function chunkArray(myArray, chunk_size) {
    var index = 0;
    //var page = 1;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      const myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }
  // Split in group of 20 items per page
  const watchListObjSplitedByPages = chunkArray(watchLaterList, 20);
  //console.log(watchListObjSplitedByPages);

  //removes movie from watchlist
  useEffect(() => {
    if (movieId !== "") {
      const token = localStorage.getItem("authToken");
      axios({
        method: "post",
        url: `${prod_uri}/watchlaterRemove`,
        data: {
          movieId: movieId,
        },
        headers: {
          authToken: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          //console.log(res.data);
          if (res.data === "movie removed from watchlist")
            setRefresher(!refresher);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  //send MovieId To SpecificMovie Component
  function sendId(event) {
    const value = event.currentTarget.getAttribute("value");
    dispatch(sendMovieIdforSpecificToRedux(value));
    localStorage.setItem("movieId", value);
  }

  document.body.style.backgroundColor = "#D7E0E6";

  return (
    <>
    {!isLogged ? <Redirect to="/Login" /> : 
    <div className="rm">
      

      <p className="text-align-center">
        You have {watchLaterList === "empty" ? 0 : watchLaterList.length} movies
        in your WatchList
      </p>
      <div className="minheight3">
        {!watchLaterList && <div className="text-align-center">Loading...</div>}

        {watchLaterList === "empty" && (
          <div>
            <p className="text-align-center">
              You don't have any movies in your WatchList! You can save them
              here from the films section.
            </p>
            <br />
            <br />
            <img
              className="center-image"
              src="https://media4.giphy.com/media/26hkhPJ5hmdD87HYA/giphy.gif"
              alt="empty-watchlist"
            />
          </div>
        )}
          <div className="container-to-reduce-on-pc-screen-size">
        <div className="watch-list-parent">
          {watchLaterList !== "empty" &&
            watchListObjSplitedByPages.map((pageInfo, index) =>
              index + 1 === page.activePage
                ? pageInfo.map((movieInfo) => (
                    <div
                      key={movieInfo.id}
                      className="watch-list-child movie-card"
                    >
                      <Link to="/SpecificMovie">
                        {movieInfo.poster_path !== null ? (
                          <img
                            className="movie-image"
                            value={movieInfo.id}
                            onMouseDown={sendId}
                            src={
                              "http://image.tmdb.org/t/p/w154" +
                              movieInfo.poster_path
                            }
                            alt="moviePoster"
                          />
                        ) : (
                          <img
                            className="movie-image"
                            value={movieInfo.id}
                            onMouseDown={sendId}
                            src={
                              "https://dummyimage.com/154x231/000/ffffff.jpg&text=" +
                              movieInfo.original_title
                            }
                            alt="moviePoster"
                          />
                        )}
                      </Link>

                      <IoIosCloseCircle
                        value={movieInfo.id}
                        onClick={removeMovie}
                        className="movie-icon-remove"
                        size="1.5em"
                        color="red"
                      />
                    </div>
                  ))
                : null
            )}
        </div></div>
      </div>

      <div className="watchlater-pag">
        <span className="centered-pagination">
          <MyPagination
            totalItemsCount={Math.ceil(watchLaterList.length / 20)}
          />
        </span>
      </div>

      <Footer />
    </div>}
    </>
  );
}

export default WatchLater;
