import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Filter from "./FilterMovies";
//import MyPagination from "./Pagination";
import { FaSave } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";

import { sendMovieIdforSpecificToRedux } from "../actions";
import ReactStars2 from "react-stars";
import "../css/ballon.css";

import { GiSpellBook } from "react-icons/gi";
import Pagination from "react-js-pagination";
import Footer from "./Footer"

//import { sendPageToRedux } from "../actions";

function Films() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const [totalPages, setTotalPages] = useState(1);
  const [result, setResults] = useState(0);
  const [movieList, setMovieList] = useState([]);
  const [movieId2, setMovieId2] = useState("");
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [rating, setRating] = useState("");
  const [showHide, setShowHide] = useState("hide");
  const [curentPageMoviesRatings, setCurentPageMoviesRatings] = useState("");
  const [ratingChanged, setRatingChanged] = useState(true);
  const [yourRatingsOnCurentPage, setYourRatingsOnCurentPage] = useState("");
  const [backendResponse, setBackendResponse] = useState("");

  //const dev_uri = "http://localhost:5000";
  const prod_uri = "https://tapesnippets.herokuapp.com"

  //the old pageStateFromRedux you can delete the redux actions and store if no more future pages will use mypagination
  //curentlly people watchlater and reviews  section still use it
  //const page = useSelector((state) => state.pageStateFromRedux);
  const [pageState, setPageState] = useState({ activePage: 1 });

  function handlePageChange(pageNumber) {
    //console.log(`curent Films page: ${pageNumber}`);
    setPageState({ activePage: pageNumber });
  }

  function saveToRatings(newRating) {
    const token = localStorage.getItem("authToken");
    
    if (token !== "" && token) {
      //console.log(newRating);
      setRating(newRating);
    } else {
      setShowHide("show");
      setTimeout(function () {
        setShowHide("hide");
      }, 1000);
      setBackendResponse("You must be logged in to rate movies!");
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
        })
        .catch((err) => {
          console.log(err);
        });
      (token !== "" && token) &&
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
    if (filter && filter.lower_than_release_date !== "0") {
      axios
        .post(`${prod_uri}/films`, {
          pagina: pageState.activePage,
          order: filter.order,
          year: filter.year,
          greater_than_release_date: filter.greater_than_release_date,
          lower_than_release_date: filter.lower_than_release_date,
          greater_than_rating_count: filter.greater_than_rating_count,
          lower_than_rating_count: filter.lower_than_rating_count,
          greater_than_rating: filter.greater_than_rating,
          lower_than_rating: filter.lower_than_rating,
          with_genres: filter.with_genres,
          without_genres: filter.without_genres,
          limba: filter.language,
        })
        .then((res) => {
          //console.log(filter.order);
          //console.log(res.data);
          setResults(res.data.total_results);
          setTotalPages(res.data.total_pages);
          //console.log("movieList:", res.data.results);
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
  }, [filter, pageState.activePage]);

  const [filtWatched, setFiltWatched] = useState(true);

  function filterWatched() {
    setFiltWatched(!filtWatched);
  }

  document.body.style.background = "f9f7f7";

  return (
    <div>
      <div className={"info-popup " + showHide}>
        <h2 className="popup-text">{backendResponse}</h2>
      </div>
      <div className="filter-films">
        <Filter />
      </div>

      <div className="films">
        <div className="text-align-center , results">Results: {result}</div>

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

        {loadingMsg ? (
          <h1 className="results">
            Loading...<div className="dummy-filler-div-20"></div>
          </h1>
        ) : null}

        <div className="container-to-reduce-on-pc-screen-size2">
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
                              .map(
                                (item) => `${reasembleGenres["code" + item]} `
                              )
                              .join("")}
                            data-balloon-pos="right"
                            data-balloon-length="small"
                          >
                            {item.poster_path !== null ? (
                              <img
                                className="just-poster"
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
                                className="just-poster"
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
                            TMDB:
                            {item.vote_average}
                            {parseInt(item.vote_average) > 6 ? (
                              <div className="TMDB-score-good"></div>
                            ) : (
                              <div className="TMDB-score-bad"></div>
                            )}
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
                          Save:
                          <span
                            value={item.id}
                            onClick={saveToWatchLater}
                            aria-label="Save to watchlater!"
                            data-balloon-pos="up"
                          >
                            <FaSave className="fa-save-green" size="1.1rem" />
                          </span>
                        </div>
                        <div className="trailer">
                          {/*<img
                          className="youtube-logo"
                          src="/yt_logo_rgb_light.png"
                          alt="youtube"
                        />*/}
                          Trailer:
                          <a
                            className="movie-info-links"
                            href={`https://www.youtube.com/results?search_query=${item.original_title} trailer`}
                          >
                            <span
                              value={item.id}
                              onClick={saveToWatchLater}
                              aria-label="Watch trailer on youtube"
                              data-balloon-pos="up"
                            >
                              <GrYoutube
                                className="fa-save-red"
                                size="1.1rem"
                              />
                            </span>
                          </a>
                        </div>
                        <div className="language">
                          Language:{item.original_language}
                        </div>
                        <div className="Synospsy">
                          Resume:
                          <span
                            aria-label={item.overview}
                            data-balloon-pos="up"
                            data-balloon-length="large"
                          >
                            <GiSpellBook size="1.1rem" />
                          </span>
                        </div>
                        <div className="stars">
                          <span value={item.id} onClick={saveToRatings2}>
                            {
                              <ReactStars2
                                key={`${item.id}+1`}
                                count={5}
                                isHalf={true}
                                onChange={saveToRatings}
                                value={
                                  yourRatingsOnCurentPage
                                    ? Math.max(
                                        ...yourRatingsOnCurentPage.map(
                                          (item3) =>
                                            item3._id === item.id.toString()
                                              ? item3.avgRating
                                              : 0
                                        )
                                      )
                                    : 0
                                }
                                size={25}
                                //color2={"#ffd700"}
                                color2={"#E5530A"}
                                //color1={"#287ab1"}
                                color1={"grey"}
                              />
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        {movieList.length !== 0 && (
          <span className="centered-pagination films-pag rm">
            {/* <MyPagination totalItemsCount={totalPages}/>*/}

            <Pagination
              activePage={pageState.activePage}
              itemsCountPerPage={1}
              totalItemsCount={totalPages}
              pageRangeDisplayed={3}
              onChange={handlePageChange}
              //for bootstrap 4 stilyng
              itemClass="page-item"
              linkClass="page-link"
            />
          </span>
        )}
      </div>
      {movieList.length !== 0 && (
        <Footer/>
      )}
    </div>
  );
}

export default Films;
