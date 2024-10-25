import User from "./navbar-items/User";
import { RoundBtn } from "./navbar-items/NavbarComp";
import { notesContentIcons } from "../../assets/icons/icons";


const NotesContentNav = ({title, setPinned, setReadOnly, pinned, readOnly}) => {
  return (
    <nav className="flex items-end justify-between">
      <h1 className="text-white text-4xl">{title}</h1>

      <ul className="flex gap-8 items-center">
        <RoundBtn
          Icon={() =>
            pinned ? <notesContentIcons.Unpin /> : <notesContentIcons.Pin />
          }
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
        <User />
      </ul>
    </nav>
  );
};

export default NotesContentNav;
