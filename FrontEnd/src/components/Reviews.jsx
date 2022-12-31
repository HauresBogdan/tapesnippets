import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MyPagination from "./Pagination";
import { GrLike } from "react-icons/gr";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ENV_URL } from "./constants";

function Reviews() {
  // const dispatch = useDispatch();
  const [allReviewsData, setAllReviewsData] = useState("");
  const [movieData, setMovieData] = useState([]);
  const page = useSelector((state) => state.pageStateFromRedux);

  const prod_uri = ENV_URL.LOCALHOST;

  useEffect(() => {
    axios({
      method: "post",
      url: `${prod_uri}/allreviews`,
      data: {
        pagina: page.activePage,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        setAllReviewsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.activePage]);

  //make axios call to tmdb for that movieId
  useEffect(() => {
    setMovieData([]);

    allReviewsData &&
      allReviewsData.pageReviews.length !== 0 &&
      allReviewsData.pageReviews.map((item) =>
        axios({
          method: "post",
          url: `${prod_uri}/specificmovie`,
          data: {
            movieId: item.movie_id,
          },
          headers: {
            authToken: localStorage.getItem("authToken"),
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allReviewsData]);


  return (
    <>
      {" "}      
      <Helmet>
        <title>TapeSnippets - Movie Reviews</title>
        <meta name="description" content="Read and manage movie reviews" />
      </Helmet>
      <div className="reviews-comp">
        <br />
        <h1 className="text-align-center">Latest Reviews:</h1>

        <Link to="/myReviews">
          <button className="center-button">Switch to my reviews</button>
        </Link>
        <div className="gradient-list">          
          {allReviewsData && allReviewsData.pageReviews.length > 0 ? (
            allReviewsData.pageReviews.map((item) => (
              <div className="individual-reviews" key={item._id}>
                {movieData.map(
                  (movieDataItem) =>
                    // eslint-disable-next-line
                    movieDataItem.id == item.movie_id &&
                    (movieDataItem.poster_path !== null ? (
                      <Link
                        to={`/SpecificMovie/${item.movie_id}`}
                        key={movieDataItem.id}
                      >
                        <span
                          aria-label={movieDataItem.original_title}
                          data-balloon-pos="left"
                          data-balloon-length="small"
                        >
                          <img
                            className="reviews-img"
                            // value={item.movie_id}
                            // onMouseDown={sendId}
                            src={
                              "https://image.tmdb.org/t/p/w154" +
                              movieDataItem.poster_path
                            }
                            alt={"moviePoster"}
                          />
                        </span>
                      </Link>
                    ) : (
                      <Link
                        to={`/SpecificMovie/${item.movie_id}`}
                        key={movieDataItem.id}
                      >
                        <span
                          aria-label={movieDataItem.original_title}
                          data-balloon-pos="left"
                          data-balloon-length="small"
                        >
                          <img
                            className="reviews-img"                            
                            src={
                              "https://dummyimage.com/154x231/000/ffffff.jpg&text=" +
                              movieDataItem.original_title
                            }                            
                            alt="moviePoster"
                          />
                        </span>
                      </Link>
                    ))
                )}

                <div className="review-box2">
                  {movieData.map(
                    (movieDataItem) =>
                      // eslint-disable-next-line
                      movieDataItem.id == item.movie_id && (
                        <h5
                          key={movieDataItem.id}
                          className="review-movie-title"
                        >
                          {movieDataItem.title}
                        </h5>
                      )
                  )}
                  {"By: "}
                  <img height="20px" src={item.user.avatar} alt="avatar" />{" "}
                  {item.user.name}
                  <p className="actual-text-review">{item.text}</p>
                  <div className="gr-like clear-float">
                    <span className="like-button">
                      <GrLike />
                    </span>
                    <span
                      aria-label={
                        item.likes && item.likes.length > 0
                          ? item.likes.map((like) => `[${like.name}]`)
                          : "no likes"
                      }
                      data-balloon-pos="top"
                      data-balloon-length="medium"
                      value2={item.likes ? item.likes : 0}
                    >
                      {item.likes ? item.likes.length : 0}
                    </span>
                  </div>
                </div>

                {item.comments.length > 0 &&
                  item.comments.map((comment) => (
                    <div className="comment-box2" key={comment._id}>
                      <img
                        height="20px"
                        src={comment.userWhoCommented.avatar}
                        alt="avatar"
                      />{" "}
                      [{comment.userWhoCommented.name}] {comment.text}
                      <div className="gr-like2">
                        <span className="like-button">
                          <GrLike />
                        </span>
                        <span
                          aria-label={
                            comment.likes && comment.likes.length > 0
                              ? comment.likes.map((like, i) => `[${like.name}]`)
                              : "no likes"
                          }
                          data-balloon-pos="top"
                          data-balloon-length="medium"
                          value2={comment.likes ? comment.likes : 0}
                        >
                          {comment.likes ? comment.likes.length : 0}
                        </span>
                      </div>
                    </div>
                  ))}
                <br />                
              </div>
            ))
          ) : (
            <div className="text-align-center">Loading...</div>
          )}

          {allReviewsData && allReviewsData.pageReviews.length === 0 && (
            <div className="text-align-center">
              There are no reviews in the database.No one wrote any. Be the
              first to write one.
              <br />
              <br />
              <img
                className="center-image"
                src="https://media2.giphy.com/media/1O2BRZcDgIfDsKMTbG/giphy.gif"
                alt="empty-reviews"
              />
            </div>
          )}
        </div>
      </div>
      <div className="review-pag">
        <span className="centered-pagination">
          {/*3 is item per page*/}
          <MyPagination
            totalItemsCount={Math.ceil(allReviewsData.allReviewsNumber / 3)}
          />
        </span>
      </div>
      <Footer />
    </>
  );
}

export default Reviews;
