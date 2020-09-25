const filterReducer = (
  state = {
    order: "popularity.desc",
    year: "",
    greater_than_release_date: "1874-01-01",
    lower_than_release_date: "0",
    greater_than_rating_count: "0",
    lower_than_rating_count: "",
    greater_than_rating: "0",
    lower_than_rating: "",
    with_genres: [],
    without_genres: [],
    language: ""
  },
  action
) => {
  switch (action.type) {    
    case "FILTERHANDLE2":
      //pass filterValue state to redux
      return action.payload;     
    default:
      return state;
  }
};
export default filterReducer;
