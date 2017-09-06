let apiKey = "319bbbf7ea49a681742ec6a1f6aeb09b";

export function loadMyMovieList() {
  return (dispatch) => {
    dispatch({type: "LOAD_MY_MOVIE_LIST"})

    fetch('/movies')
    .then(res => res.json())
    .then(json => dispatch(myMovieListLoaded(json)))
    .catch(err => console.log(err));
  }
}
export function myMovieListLoaded(movies) {
 return {
   type: "MY_MOVIE_LIST_LOADED",
   value: movies
 };
}
export function loadSearch(searchTerm) {
  return (dispatch) => {
    dispatch({type:"LOAD_SEARCH"});

    fetch('http://api.themoviedb.org/3/search/multi?query=' + searchTerm + "&api_key=" + apiKey)
    .then(res => res.json())
    .then(json => dispatch(searchLoaded(json)))

  }
}


export function searchLoaded(movies) {
 return {
   type: "SEARCH_RESULTS_LOADED",
   value: movies.results
 };
}

export function saveMyMovie(movie) {
return function (dispatch) {
fetch("/movies", {
method: "POST",
body: JSON.stringify(movie)
})
.then(() => {
dispatch(loadMyMovieList());
});
};
}

export function removeMyMovie(id) {
return function (dispatch) {
fetch("/movies/" + id,{
method: "DELETE",
body: JSON.stringify(id)
})
.then(() => {
dispatch(loadMyMovieList());
});
};
}
