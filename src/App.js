import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites]= useState([]);
  const [searchValue, setSearchValue]= useState('');

  const getMovieRequest =async(searchValue)=>{
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=cfc2b20d`;
    const response = await fetch(url);
    const responseJSON = await response.json();

    console.log(responseJSON);
    if(responseJSON.Search){
      setMovies(responseJSON.Search);
    }
  };

  const saveToLocalStorage = (items)=>{
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  }

  const addFovouriteMovie=(movie)=>{
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouritMovies = (movie)=>{
    const newFavouriteList = favourites.filter((favourite)=> favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  useEffect(()=>{
    getMovieRequest(searchValue);
  },[searchValue]);

  useEffect(()=>{
    const movieFavourites = JSON.parse(localStorage.getItem("react-movie-app-favourites"));
    setFavourites(movieFavourites);
  },[]);  

  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList movies={movies} favouriteComponent={AddFavourite}
        handleFavouritesClick={addFovouriteMovie}/>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Favourites"/>
      </div>
      <div className='row'>
        <MovieList movies={favourites} favouriteComponent={RemoveFavourites}
        handleFavouritesClick={removeFavouritMovies}/>
      </div>
    </div>
  );
}

export default App;
