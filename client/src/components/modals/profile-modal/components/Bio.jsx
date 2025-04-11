const Bio = ({ bio }) => {
  return (
    <>
      <p className="text-lg mt-4 mb-1 px-2 text-white">Bio</p>
      <span className="flex-grow min-h-15 rounded-2xl px-2 py-1 vertical-scrollbar border border-white/20 text-white">
        {bio}
      </span>
    </>
  );
};

export default Bio;
