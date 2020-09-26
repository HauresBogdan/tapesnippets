import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MyPagination from "./Pagination";
import Footer from "./Footer";
import { useParams} from "react-router";

function SpecificTSRatings() {
  //const movieId = useSelector((state) => state.movieIdForSpecific);
  const { movieIdfromParams } = useParams();
  const movieId =  movieIdfromParams;
  const [allRatingsOfCurrentMovie, setAllRatingsOfCurrentMovie] = useState("");
  const page = useSelector((state) => state.pageStateFromRedux);

  //const dev_uri = "http://localhost:5000";
  const prod_uri = "https://tapesnippets.herokuapp.com";

  // get AllRatingsOfCurrentMovie
  useEffect(() => {
    if (movieId) {
      const token = localStorage.getItem("authToken");

      axios({
        method: "post",
        url: `${prod_uri}/allratingsofcurrentmovie`,
        data: {
          movieId: movieId,
        },
        headers: {
          authToken: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          //console.log("AllRatingsOfCurrentMovie", res.data);
          setAllRatingsOfCurrentMovie(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [movieId]);

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
  const allRatingsOfCurrentMovieSplitedByPages = chunkArray(
    allRatingsOfCurrentMovie,
    5
  );
  //console.log(allRatingsOfCurrentMovieSplitedByPages);

  document.body.style.backgroundColor = "#D7E0E6";

  return (
    <>
    <div className="minheight2">
      <h1>SpecificTSRatings</h1>

      {allRatingsOfCurrentMovieSplitedByPages &&
        allRatingsOfCurrentMovieSplitedByPages.map((objForEachPage, index) =>
          index + 1 === page.activePage
            ? objForEachPage.map((item,index2) => (
                <li key={`${index2}+TS`}>
                  User:{item.user.name} Score:{item.rating}
                </li>
              ))
            : null
        )}

        </div>

      <hr />

      <div className="review-pag">
        <span className="centered-pagination">
          <MyPagination
            totalItemsCount={Math.ceil(allRatingsOfCurrentMovie.length / 5)}
          />
        </span>
      </div>

      <Footer />
    </>
  );
}

export default SpecificTSRatings;
