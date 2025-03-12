import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProcessDescription = ({ description, setDescription }) => {
  useEffect(() => {
    const updateNote = (id, description) => {
      if (description) {
        const noteIndex = notesData.findIndex((description) => description.id === id);
        notesData[noteIndex].description = description;
      }
    };

    updateNote();
  }, [description]);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "link"],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
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

  return (
    <div className="flex flex-col">
      <p className="mb-1 text-neutral-900">Description</p>
      <ReactQuill
        theme="snow"
        formats={[
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "bullet",
          "script",
          "link",
        ]}
        modules={modules}
        onChange={setDescription}
        value={description}
      />
    </div>
  );
};

export default ProcessDescription;
