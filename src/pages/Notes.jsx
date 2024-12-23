import { notesData } from "../utils/NotesData"
import NotesCard from "../components/NotesCard"
import React, { useEffect, useState } from "react"
import NotesNav from "../components/navbars/NotesNav"

const Notes = () => {  
  const pinnedNotes = notesData.filter((note) => note.pinned === true);
  const unpinnedNotes = notesData.filter((note) => note.pinned === false);
  const renderNotes = [...pinnedNotes, ...unpinnedNotes].map((note) => <NotesCard key={note.id} note={note} />);

  return (
    <div className="w-full px-10 bg-gradient-to-r from-grad-b-1 to-grad-b-2">
      <NotesNav />
      <div className="h-[33rem] flex flex-wrap gap-7 py-3 pl-6 rounded-xl scroll-smooth overflow-y-scroll scrollbar-hide">
        { renderNotes } 
      </div>
    </div>
  )
}

export default Notes