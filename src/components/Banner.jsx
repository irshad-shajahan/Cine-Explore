import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showloading } from '../redux/features/alertSlice';
import { setSearch } from '../redux/features/searchSlice';

function Banner() {
  //image links for banner
  const imageUrls = [
    "https://image.tmdb.org/t/p/original/1xhcEecvRJXQ2OAVO7l9btlrN6D.jpg",
    "https://image.tmdb.org/t/p/original/2X5nnvkWvYRFmTspXY7lsJqDzog.jpg",
    "https://image.tmdb.org/t/p/original/2meX1nMdScFOoV4370rqHWKmXhY.jpg",
    "https://image.tmdb.org/t/p/original/3G1Q5xF40HkUBJXxt2DQgQzKTp5.jpg",
    "https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc0547VKqEv.jpg",
    "https://image.tmdb.org/t/p/original/7bWxAsNPv9CXHOhZbJVlj2KxgfP.jpg",
    "https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
    "https://image.tmdb.org/t/p/original/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg"
  ];
  const dispatch = useDispatch()
  const [hide, setHide] = useState(true)
  const [formData, setFormData] = useState({});
  const currentDate = new Date().getFullYear();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  function handleChange(event) {
    setHide(true)
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  //banner image change logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 1000*15);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  //handler for submitting the search query
  function clickHandler() {
    if (formData.search) {
      if (formData.year) {
        if (formData.year > 1950 && formData.year < currentDate) {
          setHide(false)
          dispatch(setSearch(formData))
          dispatch(showloading())
        } else {
          alert("Invalid Year")
        }
      } else {
        setHide(false)
        dispatch(setSearch(formData))
        dispatch(showloading())
      }
    } else {
      alert('Please input a movie name')
    }
  }
  return (
    <div
    style={{ backgroundImage: `url(${imageUrls[currentImageIndex]})` }}
    className='bg-cover h-screen text-white flex flex-col justify-center items-center'
  >
      <div className='mt-10 sm:mt-0'>
        <div className='mb-5 text-center bg-gray-50 bg-opacity-10 border border-opacity-10 border-gray-400 rounded-lg'>
          <h1 className="text-4xl md:text-6xl font-bold font-serif bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
            CineExplore
          </h1>

          <p className="text-lg md:text-xl text-red-500 font-semibold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Unlock the magic of movies with every search.
          </p>
        </div>
        <div className='flex flex-col sm:flex-row'>
          <input type="text" className='mx-2 py-2 md:my-1 my-3 rounded-xl text-xl md:text-xl pl-3 text-black' name='search' placeholder='Search' onChange={handleChange} />
          <input type="text" className='mx-2 py-2  rounded-xl md:my-1 my-3 text-xl md:text-xl pl-3 text-black' name='year' placeholder='Year' onChange={handleChange} />
          {hide ? <button className='bg-red-600  md:px-8 py-3 rounded-xl' onClick={clickHandler}>Search</button> : ''}
        </div>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
