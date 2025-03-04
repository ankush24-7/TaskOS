import "@styles/text-editor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { notesData } from "@data/NotesData";
import NoteEditorNav from "./components/NoteEditorNav";
import NotesLoader from "@components/loaders/NotesLoader";

const NoteEditorPage = () => {
  const id = useParams().id;
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    const fetchedNote = notesData.find((note) => note.id === id);
    if (fetchedNote) {
      setNote(fetchedNote);
      setContent(fetchedNote.content);
      setPinned(fetchedNote.pinned);
    }
  }, [id]);

  useEffect(() => {
    return () => {
      if (note) {
        updateNote(note.id, content);
      }
    };
  }, [note, content]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: ["serif", "monospace"] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "code-block",
        "link",
      ],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ align: "" }, { align: "center" }, { align: "right" }],
    ],
    history: {
      delay: 1000,
      maxStack: 200,
      userOnly: true,
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const updateNote = (id, content) => {
    const noteIndex = notesData.findIndex((note) => note.id === id);
    notesData[noteIndex].content = content;
    notesData[noteIndex].pinned = pinned;
  };

  return (
    <div className="h-full sm:px-10 w-full bg-gradient-to-r from-grad-l to-grad-r">
      {note === null ? (
        <NotesLoader />
      ) : (
        <div className="flex flex-col h-full gap-4 sm:gap-7">
          <NoteEditorNav
            title={note.title}
            setPinned={setPinned}
            setReadOnly={setReadOnly}
            pinned={pinned}
            readOnly={readOnly}
          />

          {readOnly ? (
            <div
              className="text-white ql-editor px-3 sm:px-0 bg-transparent"
              dangerouslySetInnerHTML={{ __html: note.content }}></div>
          ) : (
            <ReactQuill
              theme="snow"
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "code-block",
                "list",
                "bullet",
                "script",
                "align",
                "link",
              ]}
              modules={modules}
              onChange={setContent}
              value={content}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default NoteEditorPage;
