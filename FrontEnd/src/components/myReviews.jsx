import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MyPagination from "./Pagination";
import { GrLike } from "react-icons/gr";
//import { useDispatch } from "react-redux";
//import { sendMovieIdforSpecificToRedux } from "../actions";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ENV_URL } from "./constants";

function Reviews() {
 // const dispatch = useDispatch();
  const [allReviewsData, setAllReviewsData] = useState("");
  const [newEditText, setNewEditText] = useState("");
  const [editShowUnshow, setEditShowUnshow] = useState("edit-box-hide");
  const [movieData, setMovieData] = useState([]);
  const [memoryReview_id, SetMemoryReview_id] = useState(null);
  const page = useSelector((state) => state.pageStateFromRedux);
  const [refresher, setRefresher] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);

  const prod_uri = ENV_URL.ON_RENDER;

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios({
      method: "post",
      url: `${prod_uri}/reviews`,
      data: {
        pagina: page.activePage,
      },
      headers: {
        authToken: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //console.log(res.data);
        setAllReviewsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.activePage, refresher]);

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
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allReviewsData]);

  function editReview(event) {
    setEditShowUnshow("edit-box-show");
    window.scrollTo(0, 0);

    const review_id = event.currentTarget.getAttribute("value2");
    SetMemoryReview_id(review_id);

    axios({
      method: "post",
      url: `${prod_uri}/editreview`,
      data: {
        reviews_id: review_id,
        //position: position,
      },
      headers: {
        authToken: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //1 means 1 deleted
        //console.log("edit post response:", res.data);
        setNewEditText(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditTextarea(event) {
    setNewEditText(event.target.value);
  }

  function confirmFunction() {
    setEditShowUnshow("edit-box-hide");

    axios({
      method: "post",
      url: `${prod_uri}/editreview`,
      data: {
        reviews_id: memoryReview_id,
        newText:
          newEditText +
          (newEditText.slice(newEditText.length - 8, newEditText.length) ===
          "(edited)"
            ? ""
            : " (edited)"),
      },
      headers: {
        authToken: localStorage.getItem("authToken"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setRefresher(!refresher);

       // console.log("edit post response after confirm:", res.data);

        SetMemoryReview_id(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteReview(event) {
    const response = window.confirm(
      "Are you sure you want to delete you review!"
    );
    //const position = event.currentTarget.getAttribute("value1");
    const review_id = event.currentTarget.getAttribute("value2");

    if (response === true) {
      //console.log( position);

      axios({
        method: "post",
        url: `${prod_uri}/deletereview`,
        data: {
          reviews_id: review_id,
          //position: position,
        },
        headers: {
          authToken: localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          //1 means 1 deleted
         // console.log("delete post response:", res.data);
          if (res.data === 1) {
            setRefresher(!refresher);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }


  if(isLogged)
  {
    document.body.style.background = "#476375";
  }

  return (
    <> {!isLogged ? <Redirect to="/Login" /> :  null}

      <Helmet>
        <title>TapeSnippets - Movie Reviews</title>
        <meta name="description" content="Read and manage movie reviews" />
      </Helmet>

      <div className="reviews-comp">     
        <br/>
        <h1 className="text-align-center">My Reviews:</h1>
        <div className="gradient-list">
          <div className={`${editShowUnshow} edit-review`}>
            Edit your review:
            <textarea
              className="edit-textarea"
              value={newEditText}
              onChange={handleEditTextarea}
              rows={5}
            />
            <button className="edit-confirm" onClick={confirmFunction}>
              Confirm!
            </button>
          </div>
          {allReviewsData && allReviewsData.pageReviews.length > 0 ? (
            allReviewsData.pageReviews.map((item) => (
              <div className="individual-reviews" key={item._id}>
                {movieData.map(                  
                  (movieDataItem) =>
                  // eslint-disable-next-line
                    movieDataItem.id == item.movie_id &&
                    (movieDataItem.poster_path !== null ? (
                      <Link to={`/SpecificMovie/${item.movie_id}`} key={movieDataItem.id}>
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
                      <Link to={`/SpecificMovie/${item.movie_id}`} key={movieDataItem.id}>
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
                              "https://dummyimage.com/154x231/000/ffffff.jpg&text=" +
                              movieDataItem.original_title
                            }
                            //src={"https://picsum.photos/154/231"}
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
                <div className="edit-delete">
                  <button
                    onClick={editReview}
                    value2={item._id}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={deleteReview}
                    className="delete-button"
                    value2={item._id}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
             <div className="text-align-center">Loading...</div>
          )}

          {allReviewsData && allReviewsData.pageReviews.length === 0 && (
            <div  className="text-align-center">
              You don't have any reviews of your own! Your reviews will apear
              here as soon as you add them.
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

      <Footer/>
    </>
  );
}

export default Reviews;