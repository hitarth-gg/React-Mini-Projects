import { useState, useEffect } from "react";

// this is a function only and not a component, so no need to use {} when accepting the props
// we can accept a callback function as a parameter and then call it with the data we want to pass to the parent component
export function useMovies(query) {
  const KEY = "f4feb5fa";

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController(); // this is a browser API, it's got nothing to do with React

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}&`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();

        if (data.Response === "False")
          // as API responds with {Response: 'False} when no search result is generated
          throw new Error("Movie not found");

        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          // we did this because when we cancel a fetch API request JS sees that as an error and then throws an error, we do not want this behaviour
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      } // this 'finally' block will always execute
    }
    if (query.length <= 2) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    // cleanup function : we want to cancel the current request to the API each time the query changes
    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
