import { notesModalIcons } from "../../assets/icons/icons";
import User from "./navbar-items/User";
import { RoundBtn } from "./navbar-items/NavbarComp";


const NotesContentNav = ({title, setPinned, setReadOnly, pinned, readOnly}) => {
  return (
    <nav className="flex items-end justify-between">
      <h1 className="text-white text-4xl">{title}</h1>

      <ul className="flex gap-8 items-center">
        <RoundBtn
          Icon={() =>
            pinned ? <notesModalIcons.Unpin /> : <notesModalIcons.Pin />
          }
          onClick={() => {setPinned(!pinned);}}
        />
        <RoundBtn
          Icon={() =>
            readOnly ? (
              <notesModalIcons.Edit stroke="#fff" />
            ) : (
              <notesModalIcons.Book stroke="#fff" />
            )
          }
          onClick={() => setReadOnly(!readOnly)}
        />
        <RoundBtn Icon={() => <notesModalIcons.Del stroke="#fff" />} />
        <User />
      </ul>
    </nav>
  );
};

export default NotesContentNav;
