import { Link } from "react-router-dom";
import { LogoIcon } from "@/assets/icons/icons";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <LogoIcon className="w-12 h-12 -translate-y-1.5 translate-x-1.5" />
      <p className="act-bar-label text-4xl font-inconsolata text-white">
        TaskOS
      </p>
    </Link>
  );
};

export default Logo;
