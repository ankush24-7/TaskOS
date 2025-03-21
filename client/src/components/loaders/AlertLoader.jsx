import React from "react";

const AlertLoader = () => {
  return (
    <div className="flex items-center justify-between px-2 py-3 rounded-lg bg-prim-black/50">
      <span className="flex items-center gap-2">
        <div className="loader w-8 h-8 rounded-full" />
        <div className="loader w-40 h-4 rounded-sm" />
      </span>

      <span className="flex gap-3">
        <button className="loader h-8 w-20 rounded-lg" />
        <button className="loader h-8 w-20 rounded-lg" />
      </span>
    </div>
  );
};

export default AlertLoader;
