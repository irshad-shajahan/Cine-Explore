import React, { useEffect, useState } from 'react';
import MovieComponent from './movieComponent';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { hideLoading } from '../redux/features/alertSlice';

export const API_KEY = "a708e3e0";

function Result({ setScroll }) {
  const [found, setFound] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.search.data);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    let url;
    if (data) {
      //conditionally setting the base url with or without year
      if (data.year) {
        url = `https://www.omdbapi.com/?s=${data.search}&y=${data.year}&apikey=${API_KEY}`;
      } else {
        url = `https://www.omdbapi.com/?s=${data.search}&apikey=${API_KEY}`;
      }
      //api request for fetching movie result
      Axios.get(url).then((res) => {
        setScroll(true);
        //conditionally checking whether the search result was succesful
        if (res.data.Response === "True") {
          setFound(true);
          setMovies(res.data.Search);
          dispatch(hideLoading());
        } else {
          dispatch(hideLoading());
          alert("Movie not found :(")
          setFound(false);
        }
      }).catch(()=>{
        return(
          <div className='items-center flex justify-center'>
          <img src="https://m.filmfare.com/static/img/filmfare_pwa_404_page.jpg" alt="" />
        </div>
        )
      });
    }
  }, [data]);

  return (
    <div>
      {found ? (
        <div className='md:grid-cols-5 grid-cols-2 grid'>
          {movies?.map((elem) => (
            <MovieComponent movie={elem} key={elem.imdbID} />
          ))}
        </div>
      ) : (
        <div className='items-center flex justify-center'>
          <img src="https://m.filmfare.com/static/img/filmfare_pwa_404_page.jpg" alt="" />
        </div>
      )}
    </div>
  );
}

export default Result;
