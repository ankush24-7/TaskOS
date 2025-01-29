import React from "react";
import { projectNavIcons } from "@icons";
import { notesData } from "@utils/NotesData";
import NotesNav from "./components/NotesNav";
import NotesCard from "./components/NotesCard";

const NotesPage = () => {
  const pinnedNotes = notesData.filter((note) => note.pinned === true);
  const unpinnedNotes = notesData.filter((note) => note.pinned === false);
  const renderNotes = [...pinnedNotes, ...unpinnedNotes].map((note) => (
    <NotesCard key={note.id} note={note} />
  ));

  return (
    <div className="flex flex-col flex-grow w-full px-3 sm:px-10 bg-gradient-to-r from-grad-b-1 to-grad-b-2">
      <NotesNav />

      <div className="relative w-full mt-4 sm:hidden">
        <projectNavIcons.SearchIcon className="absolute top-1/2 -translate-y-1/2 ml-1 stroke-prim-black" />
        <input
          type="text"
          placeholder="Search"
          // onChange={handleChange}
          className="w-full rounded-lg pl-8 pr-2 py-2 focus:outline-none"
        />
      </div>

      <div className="notes-container flex-grow h-20 my-8 overflow-y-scroll scrollbar-hide">
        <div className="w-full flex flex-wrap justify-evenly gap-7 lg:justify-start">
          {renderNotes}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
