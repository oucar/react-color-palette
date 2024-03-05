import React from "react";
import { NotFoundGradientBackground } from "./NotFoundGradientBackground";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="notFound">
      <NotFoundGradientBackground>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center font-bold relative">
            <p className="bg-clip-text mb-72 text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 text-3xl md:text-4xl lg:text-7xl">
              Uh... 404! This page does not exist.
            </p>
            <div className="absolute inset-0 mt-72 z-50">
              <Link
                to="/"
                className="text-3xl md:text-4xl lg:text-7xl cursor-pointer "
              >
                Click here to go back
              </Link>
            </div>
          </div>
        </div>
      </NotFoundGradientBackground>
    </div>
  );
};

export default NotFound;
