import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import SearchFilter from "./SearchFilter";
import MyPagination from "./Pagination";
import { FaSave } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";

import { sendMovieIdforSpecificToRedux } from "../actions";
import ReactStars2 from "react-stars";
import "../css/ballon.css";

import { GiSpellBook } from "react-icons/gi";
import Footer from "./Footer";

function Search() {
  const searchTerm = useSelector((state) => state.searchTermFromRedux);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const page = useSelector((state) => state.pageStateFromRedux);

  const [totalPages, setTotalPages] = useState(1);
  const [result, setResults] = useState(0);

  const [movieList, setMovieList] = useState([]);
  const [movieId2, setMovieId2] = useState("");
  const [loadingMsg, setLoadingMsg] = useState(false);

  const [rating, setRating] = useState("");
  const [curentPageMoviesRatings, setCurentPageMoviesRatings] = useState("");
  const [ratingChanged, setRatingChanged] = useState(true);

  const [yourRatingsOnCurentPage, setYourRatingsOnCurentPage] = useState([]);

  const [backendResponse, setBackendResponse] = useState("");
  const [showHide, setShowHide] = useState("hide");

  //const dev_uri = "http://localhost:5000";
  const prod_uri = "https://tapesnippets.herokuapp.com"

  function saveToRatings(newRating) {
    const token = localStorage.getItem("authToken");
    if (token !== "" || !token) {
      //console.log(newRating);
      setRating(newRating);
    } else {
      setShowHide("show");
      setTimeout(function () {
        setShowHide("hide");
      }, 1000);
      setBackendResponse("You must be logged in to do that!");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (rating !== "" && movieId2 !== "") {
      axios({
        method: "post",
        url: `${prod_uri}/saverating`,
        data: {
          movieId: movieId2,
          rating: rating,
        },
        headers: {
          authToken: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          //console.log("ratingChanged on: ", res.data);
          if (res.data === "Pls confirm email!") {
            setShowHide("show");
            setTimeout(function () {
              setShowHide("hide");
            }, 1000);
            setBackendResponse(
              "You must confirm your email before doing that!"
            );
          } else if (res.data === "Success") {
            setRatingChanged(!ratingChanged);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId2, rating]);

  useEffect(() => {
    if (movieList.length === 20) {
      //onlyIdsFromYourRatingsOnCurentPage = [];
      const curentPageMoviesID = [];
      movieList.map((item) => curentPageMoviesID.push(item.id.toString()));
      //console.log("curentPageMoviesID:", curentPageMoviesID);

      const token = localStorage.getItem("authToken");

      axios({
        method: "post",
        url: `${prod_uri}/getratings`,
        data: {
          curentPageMoviesID: curentPageMoviesID,
        },
        headers: {
          //authToken: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          //console.log(" curentPageMoviesRatings", res.data);
          setCurentPageMoviesRatings(res.data);
          //setYourRatingsOnCurentPageGeted(!yourRatingsOnCurentPageGeted);
        })
        .catch((err) => {
          console.log(err);
        });
      (token !== "" || !token) &&
        axios({
          method: "post",
          url: `${prod_uri}/getyourratings`,
          data: {
            curentPageMoviesID: curentPageMoviesID,
          },
          headers: {
            authToken: token,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            //console.log("yourRatingsOnCurentPage", res.data);
            setYourRatingsOnCurentPage(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [movieList, ratingChanged]);

  function saveToRatings2(event) {
    const movieId2 = event.currentTarget.getAttribute("value");
    //console.log(movieId2);
    setMovieId2(movieId2);
  }

  const reasembleGenres = {
    code28: "Action",
    code12: "Adventure",
    code16: "Animation",
    code35: "Comedy",
    code80: "Crime",
    code99: "Documentary",
    code18: "Drama",
    code10751: "Family",
    code14: "Fantasy",
    code36: "Hystory",
    code27: "Horror",
    code10402: "Music",
    code9648: "Mystery",
    code10749: "Romance",
    code878: "Science Fiction",
    code10770: "TV Movie",
    code53: "Thriller",
    code10752: "War Movie",
    code37: "Western",
  };

  function saveToWatchLater(event) {
    const value = event.currentTarget.getAttribute("value");
    
    //setBackendResponse("");

    const token = localStorage.getItem("authToken");
    axios({
      method: "post",
      url: `${prod_uri}/watchlater`,
      data: {
        movieId: value,
      },
      headers: {
        authToken: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //console.log("backed response", res.data);
        setShowHide("show");
    setTimeout(function () {
      setShowHide("hide");
    }, 1000);
        setBackendResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //send MovieId To SpecificMovie Component
  function sendId(event) {
    const value = event.currentTarget.getAttribute("value");
    dispatch(sendMovieIdforSpecificToRedux(value));
    localStorage.setItem("movieId", value);
  }

  useEffect(() => {
    if (searchTerm !== "" && filter.order !== "") {
      axios
        .post(`${prod_uri}/searchresults`, {
          pagina: page.activePage,
          year: filter.year,
          limba: filter.language,
          query: searchTerm,
        })
        .then((res) => {
          //console.log(res.status);
          //console.log(res.data);
          setResults(res.data.total_results);
          setTotalPages(res.data.total_pages);

          //console.log(res.data.results);
          //add response with movies from tmdb to movieList

          setMovieList(res.data.results);
          setLoadingMsg(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoadingMsg(true);
    }
  }, [filter, page, searchTerm]);

  const [filtWatched, setFiltWatched] = useState(true);

  function filterWatched() {
    setFiltWatched(!filtWatched);
  }

  document.body.style = "background-color: #0C2536;";

  return (
    <div>
      <div className={"info-popup " + showHide}>
        <h2 className="popup-text">{backendResponse}</h2>
      </div>
      <SearchFilter />
      <div className="films">
        <div className="text-align-center , results">
          Results: {result}{" "}
          <span
            className="watched-icon"
            aria-label="Hide/unhide watched movies!"
            data-balloon-pos="up"
            onClick={filterWatched}
          >
            {filtWatched === false ? (
              <FaEyeSlash size="1.5em" />
            ) : (
              <FaEye size="1.5em" />
            )}
          </span>
        </div>
        {searchTerm === "" ? (
          <div className="text-align-center , results">
            Please insert a search term!<div className="dummy-filler-div"></div>
          </div>
        ) : (
          <div className="text-align-center , results">
            Results for: {searchTerm}
          </div>
        )}

        {loadingMsg && searchTerm !== "" ? (
          <h1 className="results">
            Loading...<div className="dummy-filler-div"></div>
          </h1>
        ) : null}

        <div className="filmList">
          {movieList.map(
            (item, i) =>
              (filtWatched === true ||
                !yourRatingsOnCurentPage.find(
                  (item2) => item2._id === item.id.toString()
                )) && (
                <div key={item.id} className="my-table">
                  <div className="poster-and-info">
                    <span
                      aria-label={item.original_title}
                      data-balloon-pos="up"
                      data-balloon-length="medium"
                    >
                      <Link to="/SpecificMovie">
                        <span
                          aria-label={item.genre_ids
                            .map((item) => `${reasembleGenres["code" + item]} `)
                            .join("")}
                          data-balloon-pos="right"
                          data-balloon-length="small"
                        >
                          {item.poster_path !== null ? (
                            <img
                              value={item.id}
                              onMouseDown={sendId}
                              src={
                                "https://image.tmdb.org/t/p/w154" +
                                item.poster_path
                              }
                              alt={"moviePoster"}
                            />
                          ) : (
                            <img
                              value={item.id}
                              onMouseDown={sendId}
                              src={
                                "https://dummyimage.com/154x231/000/ffffff.jpg&text=" +
                                item.original_title
                              }
                              //src={"https://picsum.photos/154/231"}
                              alt="moviePoster"
                            />
                          )}
                        </span>
                      </Link>
                    </span>

                    <div className="movie-info">
                      <div className="year">
                        {item.release_date.slice(0, 4)}
                      </div>
                      <div className="TMDB-score">
                        <a
                          className="movie-info-links"
                          href={`https://www.themoviedb.org/movie/${item.id}`}
                        >
                          TMDB: {item.vote_average}
                        </a>
                      </div>
                      <div className="local">
                        {curentPageMoviesRatings !== ""
                          ? curentPageMoviesRatings.map((item2) =>
                              item2._id === item.id.toString() ? (
                                <div
                                  key={`${item.id}+SendToSpecifiCTSRating`}
                                  value={item.id}
                                  onMouseDown={sendId}
                                  className="ts-rating"
                                >
                                  <Link
                                    className="movie-info-links"
                                    to="/SpecificTSRatings"
                                  >
                                    Local:{" "}
                                    {item2.avgRating.toString().length > 1
                                      ? item2.avgRating.toFixed(1)
                                      : item2.avgRating}{" "}
                                  </Link>
                                </div>
                              ) : null
                            )
                          : null}
                      </div>

                      <div className="savetorating">
                        Save:{" "}
                        <span
                          value={item.id}
                          onClick={saveToWatchLater}
                          aria-label="Save to watchlater!"
                          data-balloon-pos="up"
                        >
                          <FaSave className="fa-save-green" size="1.5em" />
                        </span>
                      </div>
                      <div className="trailer">
                        <a
                          className="movie-info-links"
                          href={`https://www.youtube.com/results?search_query=${item.original_title} trailer`}
                        >
                          {/*<img
                          className="youtube-logo"
                          src="/yt_logo_rgb_light.png"
                          alt="youtube"
                        />*/}
                          Trailer:{" "}
                          <GrYoutube className="fa-save-red" size="1.5em" />
                        </a>
                      </div>
                      <div className="language">
                        Language: {item.original_language}
                      </div>
                      <div className="Synospsy">
                        Resume:{"   "}
                        <span
                          aria-label={item.overview}
                          data-balloon-pos="up"
                          data-balloon-length="large"
                        >
                          <GiSpellBook size="2em" />
                        </span>
                      </div>
                      <div className="stars">
                        <span value={item.id} onClick={saveToRatings2}>
                          {yourRatingsOnCurentPage && (
                            <ReactStars2
                              key={`${item.id}+1`}
                              count={5}
                              isHalf={true}
                              onChange={saveToRatings}
                              value={Math.max(
                                ...yourRatingsOnCurentPage.map((item3) =>
                                  item3._id === item.id.toString()
                                    ? item3.avgRating
                                    : 0
                                )
                              )}
                              size={25}
                              color2={"#ffd700"}
                              color1={"#287ab1"}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>

        {movieList.length !== 0 && (
          <span className="centered-pagination">
            <MyPagination totalItemsCount={totalPages} />
          </span>
        )}
      </div>
      {movieList.length !== 0 && (
        <Footer />
      )}
    </div>
  );
}

export default Search;
