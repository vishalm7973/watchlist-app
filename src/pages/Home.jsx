import React, { useEffect, useState } from 'react'
import axios from "axios";
import MovieCard from '../componens/MovieCard';
import { getWatchList } from '../utils/watchlist';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [watchlist, setWatchlist] = useState(() => getWatchList());

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = debouncedSearch.trim()
          ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(debouncedSearch)}`
          : `https://api.themoviedb.org/3/movie/popular`;

        const response = await axios.get(
          url,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              accept: 'application/json',
            },
          }
        )
        setMovies(response.data.results);
        setDataIsLoaded(true);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, [debouncedSearch, watchlist]);

  if (!dataIsLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center py-6">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm pr-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {
        movies.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <h2 className="text-2xl font-semibold text-gray-500">
              No Movies Found
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isWatchlist={false}
                setWatchlist={setWatchlist}
              />
            ))}
          </div>
        )
      }
    </>
  );
}

export default Home