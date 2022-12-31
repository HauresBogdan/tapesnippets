import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { ENV_URL } from "./constants";

function PersonalInfo() {
  const { userIdfromParams } = useParams();
  const [response, setResponse] = useState({
    persFile: { avatar: "", name: "", date: "", profile: { bio: "" } },
    ratingFile: [],
    reviewsFile: [],
  });
  const [ratingsMovieData, setRatingsMovieData] = useState([]);
  const [reviewsMovieData, setReviewsMovieData] = useState([]);

  const prod_uri = ENV_URL.LOCALHOST;

  useEffect(() => {
    axios({
      method: "post",
      url: `${prod_uri}/personalfile`,
      data: {
        persID: userIdfromParams,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdfromParams]);

  //make axios call to tmdb for that movieId
  useEffect(() => {
    setReviewsMovieData([]);

    response &&
      response.reviewsFile.length !== 0 &&
      response.reviewsFile.map((review) =>
        axios({
          method: "post",
          url: `${prod_uri}/specificmovie`,
          data: {
            movieId: review.movie_id,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            setReviewsMovieData((reviewsMovieData) => [...reviewsMovieData, res.data]);
          })
          .catch((err) => {
            console.log(err);
          })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  //make axios call to tmdb for that movieId
  useEffect(() => {
    setRatingsMovieData([]);

    response &&
      response.ratingFile.length !== 0 &&
      response.ratingFile.map((rating) =>
        axios({
          method: "post",
          url: `${prod_uri}/specificmovie`,
          data: {
            movieId: rating.movie_id,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            setRatingsMovieData((ratingsMovieData) => [...ratingsMovieData, res.data]);
          })
          .catch((err) => {
            console.log(err);
          })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      <div className="container text-center mt-5">
        <img className="rounded-circle" src={response.persFile.avatar} alt="avatar" />
        <h1>{response.persFile.name}</h1>
        <p>Member since: {response.persFile.date.slice(0, 10)}</p>
        <p>{response.persFile.profile.bio}</p>

        <h2 className="mt-3 text-center">Reviews: {response.reviewsFile.length}</h2>

        <table className="table container mt-3 text-center table-hover" style={{ maxWidth: "600px" }}>
          <thead className="thead-light">
            <tr>
              <th scope="col">Nr.</th>
              <th scope="col">Movie</th>
              <th scope="col">Review</th>
            </tr>
          </thead>
          <tbody>
            {response.reviewsFile.map((review, i) => (
              <tr key={review.movie_id}>
                <th scope="row">{i}</th>
                <td>
                  {reviewsMovieData.map(
                    (movieDataItem) =>
                      // eslint-disable-next-line
                      movieDataItem.id == review.movie_id &&
                      (movieDataItem.poster_path !== null ? (
                        <Link to={`/SpecificMovie/${review.movie_id}`} key={movieDataItem.id}>
                          <span aria-label={movieDataItem.original_title} data-balloon-pos="left" data-balloon-length="small">
                            <img
                              className="reviews-img-pi"
                              // value={item.movie_id}
                              // onMouseDown={sendId}
                              src={"https://image.tmdb.org/t/p/w154" + movieDataItem.poster_path}
                              alt={"moviePoster"}
                            />
                          </span>
                        </Link>
                      ) : (
                        <Link to={`/SpecificMovie/${review.movie_id}`} key={movieDataItem.id}>
                          <span aria-label={movieDataItem.original_title} data-balloon-pos="left" data-balloon-length="small">
                            <img className="reviews-img-pi" src={"https://dummyimage.com/154x231/000/ffffff.jpg&text=" + movieDataItem.original_title} alt="moviePoster" />
                          </span>
                        </Link>
                      ))
                  )}
                </td>
                <td>{review.text}</td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>
      <h2 className="mt-3 text-center">Ratings: {response.ratingFile.length}</h2>
      <div className="container d-flex flex-wrap justify-content-center text-center mt-5">
        {response.ratingFile.map((rating, i) => (
          <ul className="list-unstyled" key={rating.movie_id}>
            <li className="bg-lightgray">{i}</li>

            <li className="p-2">
              {ratingsMovieData.map(
                (movieDataItem) =>
                  // eslint-disable-next-line
                  movieDataItem.id == rating.movie_id &&
                  (movieDataItem.poster_path !== null ? (
                    <Link to={`/SpecificMovie/${rating.movie_id}`} key={movieDataItem.id}>
                      <span aria-label={movieDataItem.original_title} data-balloon-pos="left" data-balloon-length="small">
                        <img
                          className="ratings-img-pi"
                          // value={item.movie_id}
                          // onMouseDown={sendId}
                          src={"https://image.tmdb.org/t/p/w154" + movieDataItem.poster_path}
                          alt={"moviePoster"}
                        />
                      </span>
                    </Link>
                  ) : (
                    <Link to={`/SpecificMovie/${rating.movie_id}`} key={movieDataItem.id}>
                      <span aria-label={movieDataItem.original_title} data-balloon-pos="left" data-balloon-length="small">
                        <img className="ratings-img-pi" src={"https://dummyimage.com/154x231/000/ffffff.jpg&text=" + movieDataItem.original_title} alt="moviePoster" />
                      </span>
                    </Link>
                  ))
              )}
            </li>
             {/* eslint-disable-next-line */}
            <li className="bg-lightgray">{rating.rating}⭐</li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default PersonalInfo;
