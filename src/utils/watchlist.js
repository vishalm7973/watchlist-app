export const getWatchList = () => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  };
  
  export const addToWatchList = (movie) => {
    const watchlist = getWatchList();
  
    if (!watchlist.some((m) => m.id === movie.id)) {
      localStorage.setItem(
        "watchlist",
        JSON.stringify([...watchlist, movie])
      );
    }
  };
  
  export const removeFromWatchList = (movieId) => {
    const watchlist = getWatchList();
  
    localStorage.setItem(
      "watchlist",
      JSON.stringify(
        watchlist.filter((m) => m.id !== movieId)
      )
    );
  };
  
  export const isInWatchList = (movieId) => {
    return getWatchList().some((m) => m.id === movieId);
  };