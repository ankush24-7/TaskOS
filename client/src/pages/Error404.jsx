import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="w-full h-dvh py-32 flex justify-center bg-gradient-to-r from-grad-l to-grad-r">
      <div className="w-full flex flex-col items-center">
        <span className="w-full bg-prim-black/15">
          <p className="text-9xl text-center font-mono text-prim-yellow-100">ERROR 404</p>
        </span>
        <span className="flex flex-col items-center px-4 mt-6 mb-7 sm:max-w-140">
          <h1 className="text-[2.5em] text-white">Oops, Page not found!</h1>
          <p className="text-md text-center text-gray-400">
              The page you are looking for does not exist, or may have been moved. Keep exploring our site.
          </p>
        </span>
        <Link
            to="/"
            className="w-fit px-5 py-2 flex items-center justify-center rounded-xl bg-prim-yellow-200
            hover:shadow-[3px_4px_10px_rgba(0,0,0,0.2)] hover:rounded-[20px] transition-normal duration-400 ease-in-out">
            <p className="text-white">GO HOME</p>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
