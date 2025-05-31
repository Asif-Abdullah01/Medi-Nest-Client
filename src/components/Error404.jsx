import React from 'react';
import { useNavigate } from 'react-router-dom';
import errorGif from '../../src/assets/404.gif';  // adjust path as per your folder structure

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <img src={errorGif} alt="404 error" className="w-64 h-64 mb-6" />
      <h1 className="text-6xl font-extrabold text-red-600">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mt-4 mb-6 text-gray-700">
        Oops! Page Not Found
      </p>
      <p className="mb-8 max-w-md text-center text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded shadow-lg transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Error404;
