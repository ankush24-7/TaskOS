import Alerts from "./Alerts";
import Network from "./Network";
import { useState } from "react";
import { NetworkIcon, Bell } from "@/assets/icons/icons";

const HomeHub = () => {
  const [currentTab, setCurrentTab] = useState("Alerts");
  const tabs = [
    [
      "Alerts",
      <Bell
        className={`w-5 h-5 ${
          currentTab === "Alerts"
            ? "fill-prim-yellow-200 stroke-prim-yellow-200"
            : "fill-gray-400 stroke-gray-400 group-hover:stroke-white group-hover:fill-white"
        }`}
      />,
    ],
    [
      "Network",
      <NetworkIcon
        className={`w-5 h-5 ${
          currentTab === "Network"
            ? "fill-prim-yellow-200"
            : "fill-gray-400 group-hover:fill-white"
        }`}
      />,
    ],
    // [
    //   "Deadlines",
    //   <Stopwatch
    //     className={`w-5 h-5 ${
    //       currentTab === "Deadlines"
    //         ? "fill-prim-yellow-200"
    //         : "fill-gray-400 group-hover:fill-white"
    //     }`}
    //   />,
    // ],
  ];

  const left = currentTab === "Alerts" ? "0.125rem" : "8rem";

  const renderTabs = () => {
    return tabs.map(([label, Icon], i) => (
      <button
        key={i}
        onClick={() => setCurrentTab(label)}
        className="flex justify-center group w-32 py-2.5 cursor-pointer text-gray-300 hover:text-white">
        <span
          className={`relative z-10 flex items-center gap-1 ${ currentTab === label && "text-prim-yellow-200" }`}>
          {Icon}
          {label}
        </span>
      </button>
    ));
  };

  return (
    <section className="h-full md:h-[450px] w-full lg:max-w-[50%] flex flex-col pb-2 rounded-2xl bg-stone-900">
      <div className="relative w-full flex px-0.5 text-lg rounded-t-2xl bg-prim-black">
        {renderTabs()}

        <div
          style={{ left: left }}
          className="absolute rounded-xl w-32 top-0.5 bottom-0.5 transition-all ease-in-out border-b-0 border-prim-yellow-200 bg-zinc-900"
        />
      </div>

      {currentTab === "Network" && <Network />}
      {currentTab === "Alerts" && <Alerts />}
    </section>
  );
};

export default HomeHub;
