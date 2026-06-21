import React from "react";
import PropTypes from "prop-types";
import {
    Bookmark,
    BookmarkCheck,
} from "lucide-react";

import {
    addToWatchList,
    getWatchList,
    isInWatchList,
    removeFromWatchList,
} from "../utils/watchlist";

const MovieCard = ({
    movie,
    isWatchlist = false,
    setWatchlist,
}) => {

    const handleWatchList = (movie) => {
        if (isInWatchList(movie.id)) {
            removeFromWatchList(movie.id);
        } else {
            addToWatchList(movie);
        }

        if (setWatchlist) {
            setWatchlist(getWatchList());
        }
    };

    const toggleWatched = (movieId) => {
        const watchlist = getWatchList();

        const updated = watchlist.map((movie) =>
            movie.id === movieId
                ? { ...movie, watched: !movie.watched }
                : movie
        );

        localStorage.setItem(
            "watchlist",
            JSON.stringify(updated)
        );

        if (setWatchlist) {
            setWatchlist(updated);
        }
    };

    return (
        <div className="w-full rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <img
                className="w-full h-72 object-cover"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            <div className="p-4">
                <h3 className="font-semibold text-base line-clamp-2 min-h-[48px]">
                    {movie.title}
                </h3>
            </div>

            <div className="px-4 pb-4">
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        onClick={() => handleWatchList(movie)}
                    >
                        {isInWatchList(movie.id) ? (
                            <BookmarkCheck className="w-5 h-5 text-green-500" />
                        ) : (
                            <Bookmark className="w-5 h-5 text-gray-700" />
                        )}
                    </button>

                    {isWatchlist && (
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${movie.watched
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-green-600 hover:bg-green-700"
                                }`}
                            onClick={() => toggleWatched(movie.id)}
                        >
                            {movie.watched ? "Unwatch" : "Watched"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        watched: PropTypes.bool,
    }).isRequired,
    isWatchlist: PropTypes.bool,
    setWatchlist: PropTypes.func,
};

export default MovieCard;