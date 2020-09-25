export const loggedin = () => {
    return {
        type: 'LOGGEDIN'
    }
}

export const loggedout = () => {
    return {
        type: 'LOGGEDOUT'
    }
}

//pass filterValue state to redux
export const filterHand2 = (justTheState) => {
    return {
        type: 'FILTERHANDLE2',
        payload: justTheState
    }
}

export const sendPageToRedux = (justTheState) => {
    return {
        type: "GETPAGE",
        payload: justTheState
    }
}

export const sendMovieIdforSpecificToRedux = (value) => {
    return {
        type: "SENDMOVIEID",
        payload: value
    }
}

export const sendSearchTermToRedux = (justTheState) => {
    return {
        type: "GETSEARCHTERM",
        payload: justTheState
    }
}