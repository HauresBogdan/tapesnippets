const paginationReducer = (state = {activePage: 1}, action) => {
  switch (action.type) {
    case "GETPAGE":
      return action.payload;
    default:
      return state;
  }
};
export default paginationReducer;
