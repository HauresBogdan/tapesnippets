import React, { useEffect, useState } from "react";
//import { Redirect } from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//import { sendMovieIdforSpecificToRedux } from "../actions";
import { GrLike } from "react-icons/gr";
import { FaRegCommentDots } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

import "../css/ballon.css";
import WhoLiked from "./WhoLiked";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { useParams} from "react-router";

function SpecificMovie() {
  //const isLogged = useSelector((state) => state.isLogged);

  const [movieData, setMovieData] = useState({});
  //const dispatch = useDispatch();
  //dispatch(sendMovieIdforSpecificToRedux(localStorage.getItem("movieId")));
  //const movieIdForSpecific = useSelector((state) => state.movieIdForSpecific);
  const { movieIdfromParams } = useParams();
   const movieIdForSpecific =  movieIdfromParams;

  const [movieReview, setMovieReview] = useState("");
  const [reviewsData, setReviewsData] = useState("");
  const [imdbScore, setIMDBScore] = useState("");
  const [refresher, setRefresher] = useState(true);
  const [answerFromPostReview, setAnswerFromPostReview] = useState("");
  const [commentToPost, setCommentToPost] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [submitedComment, setSubmitedComment] = useState(true);
  const [postComment, setpostComment] = useState(true);
  const [commentBoxIndex, setCommentBoxIndex] = useState("");
  const [likeResponse, setLikeResponse] = useState("");
  const [revealWhoLiked, setRevealWhoLiked] = useState(false);
  const [whoLikedUsersId, setWhoLikedUsersId] = useState([]);

  const [backendResponse, setBackendResponse] = useState("");
  const [showHide, setShowHide] = useState("hide");

  
  
  //const dev_uri = "http://localhost:5000";
  const prod_uri = "https://tapesnippets.herokuapp.com";

  function sendCommentToBackend(event) {
    const value = event.target.value;
    const value2 = event.currentTarget.getAttribute("value2");
    setCommentToPost(value);
    setReviewId(value2);
  }

  function submitComment() {
    setSubmitedComment(!submitedComment);
  }

  
      

  //send  comment to backend
  useEffect(() => {
    if (reviewId !== "" && commentToPost !== "") {
      const token = localStorage.getItem("authToken");
      axios({
        method: "post",
        url: `${prod_uri}/comments`,
        data: {
          movieId: movieIdForSpecific,
          comment: commentToPost,
          reviewId: reviewId,
        },
        headers: {
          authToken: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          //console.log("response from backend:", res.data);
          if (res.data === "user unconfirmed") {
            setShowHide("show");
            setTimeout(function () {
              setShowHide("hide");
            }, 1000);
            setBackendResponse("You must confirm your email to post comments!");
          } else if (res.data === "saved comment") {
            setCommentToPost("");
            setReviewId("");
            setpostComment(!postComment);
          }
        })
        .catch((err) => {
          console.log(err);
          setShowHide("show");
          setTimeout(function () {
            setShowHide("hide");
          }, 1000);
          setBackendResponse("You must be logged in to do that!");
        });
    }

    // eslint-disable-next-line
  }, [submitedComment]);

  function handleTextarea(event) {
    setMovieReview(event.target.value);
  }

  function handleReview() {
    //post review (movieReview) to db

    axios({
      method: "post",
      url: `${prod_uri}/postreview`,
      data: {
        movieId: movieIdForSpecific,
        review: movieReview,
      },
      headers: {
        authToken: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //console.log("/postreview", res.data);
        setAnswerFromPostReview(res.data);
        //setTimeout(setAnswerFromPostReview(res.data), 3000);
        setRefresher(!refresher);
      })
      .catch((err) => {
        console.log(err);

        setShowHide("show");
        setTimeout(function () {
          setShowHide("hide");
        }, 1000);
        setBackendResponse("You must be logged in to do that!");
      });
  }

  //make axios call to tmdb for that movieId
  useEffect(() => {
    axios({
      method: "post",
      url: `${prod_uri}/specificmovie`,
      data: {
        movieId: movieIdForSpecific,
      },
      headers: {
        //authToken: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //console.log(res.data);
        setMovieData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieIdForSpecific]);

  //make axios call to backend for retrieving reviews of that movie from my database
  useEffect(() => {
    axios({
      method: "post",
      url: `${prod_uri}/specificmoviereviews`,
      data: {
        movieId: movieIdForSpecific,
      },
      headers: {
        //authToken: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setReviewsData(res.data);
        //console.log("reviesData", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieIdForSpecific, refresher, postComment]);

  useEffect(() => {
    document.body.style.backgroundColor = "rgba(12, 37, 54, 1)";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  useEffect(() => {
    if (movieData.imdb_id != null) {
      axios({
        method: "post",
        url: `${prod_uri}/scraper`,
        data: {
          url: `https://www.imdb.com/title/${movieData.imdb_id}/`,
        },
      })
        .then((res) => {
          //console.log(res.data);
          setIMDBScore(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [movieData]);

  function addLike(event) {
    const value = event.currentTarget.getAttribute("value");
    const value2 = event.currentTarget.getAttribute("value2");

    axios({
      method: "post",
      url: `${prod_uri}/likes`,
      data: {
        reviews_id: value,
        comment_id: value2,
      },
      headers: {
        authToken: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log("from addLike", res.data);
        if (res.data === "Pls confirm your email before adding likes") {
          setShowHide("show");
          setTimeout(function () {
            setShowHide("hide");
          }, 1000);
          setBackendResponse("Pls confirm your email before adding likes!");
        } else {
          setLikeResponse(res.data);
          setRefresher(!refresher);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowHide("show");
        setTimeout(function () {
          setShowHide("hide");
        }, 1000);
        setBackendResponse("You must be logged in to add likes!");
      });
  }

  if (likeResponse === "already liked") {
    setShowHide("show");
    setTimeout(function () {
      setShowHide("hide");
    }, 1000);
    setBackendResponse("You already liked this!");
    setLikeResponse("");
  }

  function showWhoLiked(event) {
    const value2 = event.currentTarget.getAttribute("value2");
    const arrfromvalue = value2.split(",");
    //console.log(typeof value2);
    setRevealWhoLiked(true);
    setWhoLikedUsersId(arrfromvalue);
  }

  return (
    <>
      {/*we want even unloged in people to se the specific page so i commented next line*/}
      {/*!isLogged ? <Redirect to="/Login" /> : null*/}

      <div className={"info-popup " + showHide}>
        <h2 className="popup-text">{backendResponse}</h2>
      </div>

      <Helmet>
        <title>{`${movieData.title} Score - Write Review`}</title>
        <meta
          name="description"
          content="Write movie review or read other comprehensive reviews from other people for this a particular movie"
        />
      </Helmet>

      {revealWhoLiked === true && (
        <>
          <WhoLiked whoLiked={whoLikedUsersId} />
          <span
            onClick={() => setRevealWhoLiked(false)}
            className="close-likes"
          >
            <AiFillCloseCircle size="2em" color="#63194d" />
          </span>
        </>
      )}

      <div className="backdrop-shadow1"></div>
      <div className="backdrop-shadow2"></div>

      {movieData.poster_path !== null ? (
        <img
          className="movie-backdrop"
          src={"https://image.tmdb.org/t/p/w1280/" + movieData.backdrop_path}
          alt="moviePoster"
        />
      ) : (
        <img
          className="movie-backdrop"
          src={
            "https://dummyimage.com/1280x720/000/ffffff.jpg&text=" +
            movieData.original_title
          }
          //src={"https://picsum.photos/154/231"}
          alt="moviePoster"
        />
      )}

      <div className="movie-info-section">
        <h1 className="movie-title">{movieData.title}</h1>
        <div className="my-flex">
          {movieData.poster_path !== null ? (
            <img
              className="movie-poster-specific"
              src={"https://image.tmdb.org/t/p/w342" + movieData.poster_path}
              alt="moviePoster"
            />
          ) : (
            <img
              className="movie-poster-specific"
              src={
                "https://dummyimage.com/342x513/000/ffffff.jpg&text=" +
                movieData.original_title
              }
              //src={"https://picsum.photos/154/231"}
              alt="moviePoster"
            />
          )}

          <ul className="spec1">
          <div className="text-align-center">Stats:</div>
          <br/>
            <li>Aka: {movieData.original_title}</li>
            <li>Budget: {movieData.budget}</li>
            <li>
              Genres:{" "}
              {movieData.genres
                ? movieData.genres.map((item, index) =>
                    index !== movieData.genres.length - 1
                      ? item.name + " , "
                      : item.name + ". "
                  )
                : null}
            </li>
            <li>
              Homepage:{" "}
              <a className="homepage" href={movieData.homepage}>
                Link
              </a>
            </li>
            <li>Language: {movieData.original_language}</li>
            <li>Popularity: {movieData.popularity}</li>
            <li>
              Production:{" "}
              {movieData.genres
                ? movieData.production_companies.map((item, index) =>
                    index !== movieData.production_companies.length - 1
                      ? item.name + " , "
                      : item.name + ". "
                  )
                : null}
            </li>
            <li>
              Production countries:{" "}
              {movieData.genres
                ? movieData.production_countries.map((item, index) =>
                    index !== movieData.production_countries.length - 1
                      ? item.name + " , "
                      : item.name + ". "
                  )
                : null}
            </li>

            <li>Release date: {movieData.release_date}</li>
            <li>Revenue: {movieData.revenue}</li>
            <li>
              Spoken languages:{" "}
              {movieData.genres
                ? movieData.spoken_languages.map((item, index) =>
                    index !== movieData.spoken_languages.length - 1
                      ? item.name + " , "
                      : item.name + ". "
                  )
                : null}
            </li>
            <li>Status: {movieData.status}</li>
            <li>Tagline: {movieData.tagline}</li>
            <li>Runtime: {movieData.runtime}</li>
            <li className="tmdb-spec2">
              <a
                className="tmdb-spec"
                href={`https://www.themoviedb.org/movie/${movieData.id}`}
              >
                Tmdb rating: {movieData.vote_average} ⭐
              </a>
            </li>
            <li className="border-wall">
              <a
                className="tmdb-spec"
                href={`https://www.imdb.com/title/${movieData.imdb_id}`}
              >
                Imdb rating: {imdbScore} ⭐{" "}
                <img
                  src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"
                  alt="imdb logo"
                  height="5%"
                  width="5%"
                />{" "}
              </a>
            </li>
            <li>Vote Count: {movieData.vote_count}</li>
          </ul>

          <div className="resume">
            <div className="text-align-center">Resume:</div>
            <br />
            <p> {movieData.overview}</p>
          </div>
        </div>

        <br />

        
        <div className="reviews-section">
        <p className="answer-from-post-review">{answerFromPostReview}</p>
          <textarea
            name="review"
            placeholder="Add review..."
            className="review-textarea"
            maxLength="20000"
            value={movieReview}
            onChange={handleTextarea}
          ></textarea>
          <br />

          <button
            className="review-submit"
            type="button"
            onClick={handleReview}
          >
            Submit!
          </button>

          <br />
          <hr />

          <ul className="sectiunea-reviews">
            {reviewsData &&
              reviewsData.map((review) => (
                <li className="sectiunea-review" key={review._id}>
                  <div className="user-and-name">
                    <img
                      className="avatar-review-s"
                      alt="avatar"
                      src={review.user.avatar}
                    ></img>
                    {" " + review.user.name}
                  </div>
                  <div className="review-box">
                    {review.text}

                    <div className="gr-like">
                      <span
                        className="like-button"
                        value={review._id}
                        onClick={addLike}
                      >
                        <GrLike />
                      </span>
                      <span
                        onClick={showWhoLiked}
                        aria-label={
                          review.likes && review.likes.length > 0
                            ? "click to see who"
                            : "no likes"
                        }
                        data-balloon-pos="top"
                        data-balloon-length="medium"
                        value2={review.likes ? review.likes : 0}
                      >
                        {review.likes ? review.likes.length : 0}
                      </span>
                    </div>
                  </div>

                  {review.comments.map((itemComment) => (
                    <div className="comment-box" key={itemComment._id}>
                      <img
                        height="20px"
                        src={itemComment.userWhoCommented.avatar}
                        alt="avatar"
                      />{" "}
                      [{itemComment.userWhoCommented.name}] {itemComment.text}
                      <div className="gr-like2">
                        <span
                          className="like-button"
                          value={review._id}
                          value2={itemComment._id}
                          onClick={addLike}
                        >
                          <GrLike />
                        </span>
                        <span
                          onClick={showWhoLiked}
                          aria-label={
                            itemComment.likes && itemComment.likes.length > 0
                              ? "click to see who"
                              : "no likes"
                          }
                          data-balloon-pos="top"
                          data-balloon-length="medium"
                          value2={itemComment.likes ? itemComment.likes : 0}
                        >
                          {itemComment.likes ? itemComment.likes.length : 0}
                        </span>
                      </div>
                    </div>
                  ))}
                  <br />
                  <FaRegCommentDots
                    onClick={() => setCommentBoxIndex(review._id)}
                  />
                  {review._id === commentBoxIndex ? (
                    <div>
                      <textarea
                        rows={3}
                        value={commentToPost}
                        value2={review._id}
                        placeholder="comment..."
                        onChange={sendCommentToBackend}
                        className="comments-textarea"
                      />{" "}
                      <button
                        className="comment-button"
                        onClick={submitComment}
                      >
                        Comment
                      </button>
                    </div>
                  ) : null}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SpecificMovie;
