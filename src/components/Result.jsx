import React, { useEffect, useState } from 'react';
import MovieComponent from './movieComponent';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { hideLoading, showloading } from '../redux/features/alertSlice';

export const API_KEY = "a708e3e0";

function Result({ setScroll }) {
  const [found, setFound] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.search.data);
  const [movies, setMovies] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  function fetchMovies(page){
    let url;
    if (data) {
      //conditionally setting the base url with or without year
      if (data.year) {
        url = `https://www.omdbapi.com/?s=${data.search}&y=${data.year}&page=${page}&apikey=${API_KEY}`;
      } else {
        url = `https://www.omdbapi.com/?s=${data.search}&page=${page}&apikey=${API_KEY}`;
      }
      //api request for fetching movie result
      Axios.get(url).then((res) => {
        console.log(res);
        setScroll(true);
        //conditionally checking whether the search result was successful
        if (res.data.Response === "True") {
          setFound(true);
          setMovies(res.data.Search);
          setTotalResults(res.data.totalResults);
          dispatch(hideLoading());
        } else {
          dispatch(hideLoading());
          alert("Movie not found :(");
          setFound(false);
        }
      }).catch(() => {
        // Handle API error or network failure
        console.error("Error fetching movie data");
      });
    }
  }
  useEffect(() => {
    setCurrentPage(1)
    fetchMovies(1)
  }, [data]);

  const handlePageChange = (page) => {
    dispatch(showloading())
    fetchMovies(page)
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalResults / 10); // Assuming 20 movies per page
    const pages = [];
  
    // Calculate the range of page numbers to be displayed
    let startPage, endPage;
    if (totalPages <= 28) {
      // If total pages is less than or equal to 10, display all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // If total pages is greater than 10, limit the displayed pages
      if (currentPage <= 15) {
        // Display the first 10 pages
        startPage = 1;
        endPage = 28;
      } else if (currentPage + 13 >= totalPages) {
        // Display the last 10 pages
        startPage = totalPages - 27;
        endPage = totalPages;
      } else {
        // Display 5 pages before and after the current page
        startPage = currentPage - 14;
        endPage = currentPage + 13;
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={ `bg-yellow-500 m-2 p-2 rounded-md font-semibold w-8 pagination-button ${currentPage === i ? 'bg-red-500' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
  
    return (
      <div className="pagination">
        {pages}
      </div>
    );
  };
  

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
      {renderPagination()}
    </div>
  );
}

export default Result;
