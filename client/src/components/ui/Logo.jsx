import React from "react";
import { LogoIcon } from "@icons";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <LogoIcon className="w-12 h-12 -translate-y-1.5 translate-x-1.5" />
      <p className="act-bar-label text-white text-4xl font-inconsolata">
        TaskOS
      </p>
    </Link>
  );
};

export default Logo;
