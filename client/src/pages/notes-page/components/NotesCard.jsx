import { Pin } from "@icons";
import { Link } from "react-router-dom";

const NotesCard = ({ note }) => {
  const title = note.title.toLowerCase().replace(" ", "-");
  return (
    <Link to={`/notes/${title}/${note.id}`}>
      <button key={note.id}>
        <div className="h-60 max-w-48 p-3 flex flex-col justify-between rounded-lg bg-[#111]/30">
          <div
            className="text-white ql-editor p-2 text-sm bg-transparent overflow-hidden"
            dangerouslySetInnerHTML={{ __html: note.content }}>
          </div>
          {/* <div className="text-[#b0b0b0] text-sm mt-2">{note.tags}</div> */}
        </div>

        <div className="flex flex-col items-center mt-1">
          <div className="relative">
            {note.pinned && (
              <Pin className="w-5 h-5 absolute -left-6 top-1/2 -translate-y-1/2" />
            )}
            <h2 className="text-[#ececec] text-xl text-center">{note.title}</h2>
          </div>
          <p className="text-[#b0b0b0] text-sm text-center leading-4">
            {note.lastModified}
          </p>
        </div>
      </button>
    </Link>
  );
};

export default NotesCard;
