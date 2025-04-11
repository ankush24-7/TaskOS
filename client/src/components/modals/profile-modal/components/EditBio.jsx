const EditBio = ({ bio, setUser }) => {
  return (
    <>
      <label htmlFor="bio" className="text-lg mt-4 mb-1 px-2 text-white">
        Bio
      </label>
      <textarea
        name="bio"
        id="bio"
        placeholder="Write something about yourself..."
        value={bio}
        onChange={(e) => setUser({ ...user, bio: e.target.value })}
        className="flex-grow min-h-15 rounded-2xl px-2 py-1 field-sizing-content vertical-scrollbar focus:outline-none border border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
      />
    </>
  );
};

export default EditBio;
