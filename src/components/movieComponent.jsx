import React from 'react';

function MovieComponent({ movie }) {
  return (
    <div className="md:w-56 m-5 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="flex-grow">
        <img className="w-full h-full object-cover" src={movie?.Poster} alt="poster" />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold">{movie?.Title}</h2>
        <p className="text-gray-500">{movie?.Year}</p>
        <p className="text-gray-500">{movie?.Type}</p>
      </div>
    </div>
  );
}

export default MovieComponent;
