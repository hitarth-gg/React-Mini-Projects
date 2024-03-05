/* ------------------------------------------------------ */
/*             Completed till 13 - Lecture 005            */
/* ------------------------------------------------------ */

import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


export default function App() {
  const [query, setQuery] = useState("");
  // const [movies, setMovies] = useState([]);
  // const tempQuery = "interstellar";
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const [watched, setWatched] = useState([]);

  const {movies, isLoading, error} = useMovies(query);

  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // Local Storage :
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
    // we need to convert all of this into a string cuz, in local storage we can only store key value pairs where the value is a string.
  }

  function handDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  ); // we want to run this function each time the watched array is updated

  /* ------- converting to a custom hook "useMovies" ------ */

  // useEffect(() => {
  //   const controller = new AbortController(); // this is a browser API, it's got nothing to do with React

  //   async function fetchMovies() {
  //     try {
  //       setIsLoading(true);
  //       setError("");

  //       const res = await fetch(
  //         `http://www.omdbapi.com/?apikey=${KEY}&s=${query}&`,
  //         { signal: controller.signal }
  //       );

  //       if (!res.ok)
  //         throw new Error("Something went wrong with fetching movies");

  //       const data = await res.json();

  //       if (data.Response === "False")
  //         // as API responds with {Response: 'False} when no search result is generated
  //         throw new Error("Movie not found");

  //       setMovies(data.Search);
  //       setIsLoading(false);
  //     } catch (err) {
  //       if (err.name !== "AbortError") {
  //         // we did this because when we cancel a fetch API request JS sees that as an error and then throws an error, we do not want this behaviour
  //         setError(err.message);
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     } // this 'finally' block will always execute
  //   }
  //   if (query.length <= 2) {
  //     setMovies([]);
  //     setError("");
  //     return;
  //   }
  //   fetchMovies();

  //   // cleanup function : we want to cancel the current request to the API each time the query changes
  //   return function () {
  //     controller.abort();
  //   };
  // }, [query]); // here the empty dependency array "[]" which means that the effect that we just specified here will only run on mount i.e. it will only run when this App() component is rendered for the very first time
  // register effect basically means that we want this fetch code to be executed after the App() component has finished rendering on the browser
  /* ------------------------------------------------------ */

  return (
    <>
      <NavBar>
        {/* Notice that this NavBar is a function and not an HTML component*/}
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        {/* Explicitly passing Elements as Props: */}
        {/* <ListBox children={<MovieList movies={movies}/>}/> */}

        {/* Implicitly passing Elements */}
        <ListBox>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <WatchedBox
          selectedId={selectedId}
          onCloseMovie={handleCloseMovie}
          watched={watched}
          onAddWatched={handleAddWatched}
          onDeleteWatched={handDeleteWatched}
        />
      </Main>
    </>
  );
}

/* ----------------------- Loader ----------------------- */
function Loader() {
  return <p className="loader">Loading...</p>;
}
/* ------------------------------------------------------ */

/* ------------------------ Error ----------------------- */
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⚠️</span>
      <br></br>
      {message}
    </p>
  );
}
/* ------------------------------------------------------ */

/* ----------------------- NavBar ----------------------- */
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null); // we use useRef to get a reference to the input element

  useEffect(function () {
    inputEl.current.focus();

    function callback(e) {
      // activeElement is the element currently being focused
      if (document.activeElement === inputEl.current) return; // → we are doing this to prevent the code below from being executed and setQuery("") from happening when we are searching for something and press the enter key to search. Otherwise as soon as we press the Enter key to search then the data we had put in the search will disappear.

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery(""); // to clear the input field after pressing enter
      }
    }

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl} // now they are connected in a declarative way
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
/* ------------------------------------------------------ */

function Main({ children }) {
  return <main className="main">{children}</main>;
}

/* ----------------------- ListBox ---------------------- */
function ListBox({ children, element }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
/* ------------------------------------------------------ */

/* --------------------- WatchedBox --------------------- */
function WatchedBox({
  selectedId,
  onCloseMovie,
  watched,
  onAddWatched,
  onDeleteWatched,
}) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={onCloseMovie}
              onAddWatched={onAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={onDeleteWatched}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const KEY = "f4feb5fa";


  /* ------------------------------------------------------ */
  // the idea is to store the number of times a user clicks the rating stars in the countRef variable, this variable since we are using a useRef has to persist it's value across renders and should not cause a re render on a change
  const countRef = useRef(0); // 0 is the initial value of countRef variable
  // let count = 0; // this will reset the count to 0 each time the component re-renders

  useEffect(
    function () {
      if (userRating)
        // As we do not want to run this effect when the userRating is empty or when the component mounts
        countRef.current = countRef.current += 1;;
      console.log(countRef.current);
    },
    [userRating]
  );

  /* ------------------------------------------------------ */

  const isWatched = watched.map((movie) => movie.imdbID).includes(movie.imdbID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRating: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          console.log("CLOSING");
        }
      }
      document.addEventListener("keydown", callback); //adding an event listener

      // we'll have to remove the event listener every time the movie details component un mounts otherwise every time we'll select any other movie, it'll render the movie details component again which will add an extra event listener and will keep on doing so as we change the movies.
      return function () {
        document.removeEventListener("keydown", callback); // here the function that we pass in must be the same as the one we used in .addEventListener so we have to create a seperate function 'callback' for that.
      };
    },
    [onCloseMovie]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}&`
        );
        const data = await res.json();
        setIsLoading(false);
        setMovie(data);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      // cleanup function : will be ran after a component un-mounts and before the effect is executed again
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`}></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} on IMDb
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {isWatched ? (
                <p>You have already rated this movie {watchedUserRating}⭐</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Cast: {actors}</p>
            <p>Director: {director}</p>
          </section>

          {/* {selectedId} */}
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(2);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(2);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length || 0} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating || 0}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating || 0}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime || 0} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
/* ------------------------------------------------------ */
