const searchTermReducer = (state = "", action) => {
    switch (action.type) {
      case "GETSEARCHTERM":
        return action.payload;
      default:
        return state;
    }
  };
  export default searchTermReducer;
  