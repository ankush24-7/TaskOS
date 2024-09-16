import React from "react";
import Header from "./Header";
import Task from "./Task";
import taskadd from "../../../../assets/taskadd.svg";

function Section({ name, count, headerColor, bgColor }) {
  return (
    <div
      className="w-[17rem] h-full relative"
      style={{ backgroundColor: bgColor }}>
      <Header name={name} count={count} color={headerColor} />

      <div className="mt-[4.25rem] h-[calc(100%-8rem)] overflow-y-scroll scroll-smooth scrollbar-hide">
        <div className="flex flex-col gap-2 mb-6">
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <button className="bg-white rounded-full mx-auto w-7 h-7">
            <img src={taskadd} alt="icon_add" className="mx-auto w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section;
