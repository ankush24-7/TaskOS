import { RoundBtn } from "@navbtns";
import { notesContentIcons } from "@icons";

const NotesContentNav = ({title, setPinned, setReadOnly, pinned, readOnly}) => {
  return (
    <nav className="flex items-end justify-between px-3 py-2 sm:px-0 sm:py-5">
      <h1 className="text-white text-3xl sm:text-4xl">{title}</h1>

      <ul className="flex items-center gap-4 sm:gap-8">
        <RoundBtn
          Icon={() => pinned ? <notesContentIcons.Unpin /> : <notesContentIcons.Pin />}
          onClick={() => {setPinned(!pinned);}}
        />
        <RoundBtn
          Icon={() =>
            readOnly ? (
              <notesContentIcons.Edit stroke="#fff" />
            ) : (
              <notesContentIcons.Book stroke="#fff" />
            )
          }
          onClick={() => setReadOnly(!readOnly)}
        />
        <RoundBtn Icon={() => <notesContentIcons.Del stroke="#fff" />} />
      </ul>
    </nav>
  );
};

export default NotesContentNav;