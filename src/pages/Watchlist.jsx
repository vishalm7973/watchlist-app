import React, { useEffect, useState } from "react";
import { getWatchList } from "../utils/watchlist";
import MovieCard from "../componens/MovieCard";

const Watchlist = () => {
  const [filter, setFilter] = useState("all");
  const [watchlist, setWatchlist] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    setWatchlist(getWatchList());
    setDataIsLoaded(true);
  }, []);

  const filteredMovies = watchlist.filter((movie) => {
    if (filter === "watched") {
      return movie.watched;
    }

    if (filter === "unwatched") {
      return !movie.watched;
    }

    return true;
  });

  const watchedCount = watchlist.filter(movie => movie.watched).length;
  const unwatchedCount = watchlist.filter(movie => !movie.watched).length;

  if (!dataIsLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4 p-6">
        <button
          className={`px-4 py-2 rounded-md ${filter === "all"
            ? "bg-blue-700 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
          onClick={() => setFilter("all")}
        >
          All ({watchedCount + unwatchedCount})
        </button>

        <button
          className={`px-4 py-2 rounded-md ${filter === "watched"
            ? "bg-green-700 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
          onClick={() => setFilter("watched")}
        >
          Watched ({watchedCount})
        </button>

        <button
          className={`px-4 py-2 rounded-md ${filter === "unwatched"
            ? "bg-red-700 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
          onClick={() => setFilter("unwatched")}
        >
          Unwatched ({unwatchedCount})
        </button>
      </div>

      {
        filteredMovies.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <h2 className="text-2xl font-semibold text-gray-500">
              No Movies Yet
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isWatchlist={true}
                setWatchlist={setWatchlist}
              />
            ))}
          </div>
        )
      }
    </>
  );
};

export default Watchlist;