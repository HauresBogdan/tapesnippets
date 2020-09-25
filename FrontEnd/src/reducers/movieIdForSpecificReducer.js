const movieIdForSpecificReducer = (state = "", action) => {
    switch(action.type) {
        case 'SENDMOVIEID':
            return action.payload;
       
        default:
            return state;

    }
}
export default movieIdForSpecificReducer;