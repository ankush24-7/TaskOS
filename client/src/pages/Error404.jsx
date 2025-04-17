import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="w-full h-dvh p-40 flex justify-center bg-gradient-to-r from-grad-l to-grad-r border-prim-ye">
      <div className=" flex flex-col items-center">
        <p className="text-9xl font-mono text-prim-yellow-100">ERROR 404</p>
        <h1 className="text-[42px] mt-6 text-white">Oops, Page not found!</h1>
        <p className="text-md text-gray-400">
            The page you are looking for does not exist, or may have been moved.
        </p>
        <p className="pb-7 text-lg text-gray-400">
            Keep exploring our site.
        </p>
        <Link
            to="/"
            className="w-fit px-5 py-2 flex items-center justify-center rounded-xl bg-prim-yellow-200
            hover:shadow-[3px_4px_6px_rgba(0,0,0,0.4)] hover:rounded-[20px] transition-normal duration-400 ease-in-out">
            <p className="text-white">GO HOME</p>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
