import React, { useState, useEffect } from "react";
import MoviesList from "../components/movies-list";
import Spinner from "../components/spinner";

const Home = () => {
  const [state, setState] = useState({
    movies: [],
    redirect: false,
    isLoaded: false
  });

  useEffect(() => {
    let isCancelled = false;

    fetch("/api/movies")
      .then(res => res.json())
      .then(data => {
        setState({ ...state, movies: data, isLoaded: true });
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  if (!state.isLoaded) {
    return <Spinner />;
  } else {
    return (
      <div className="movies-list">
        <MoviesList array={state.movies} />
      </div>
    );
  }
};

export default Home;
