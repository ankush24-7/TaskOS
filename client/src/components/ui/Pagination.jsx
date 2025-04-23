import { ChevronDown } from "@/assets/icons/icons";

const pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handleClick = (page) => setCurrentPage(page);
  const handlePrev = () => setCurrentPage(currentPage => currentPage - 1);
  const handleNext = () => setCurrentPage(currentPage => currentPage + 1);

  const pageBtn = (page) => {
    return (
      <button 
        onClick={() => handleClick(page)}
        className={`flex items-center justify-center rounded-lg w-9 h-9 cursor-pointer text-white hover:bg-prim-black/40 
          ${currentPage === page ? "border-[1.5px] border-prim-yellow-100 bg-prim-black/40" : ""}`}>
        <p>{page}</p>
      </button>
    );
  }

  return (
    <footer className="w-full mt-2 hidden md:flex">
      <span className="flex items-center w-fit gap-2 mx-auto">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          style={{ display: totalPages === 1 ? "none" : "flex" }}
          className={`items-center justify-center rounded-lg pl-1 pr-2 py-2 cursor-pointer 
            ${currentPage === 1 ? "text-gray-400" : "text-white hover:bg-prim-black/40"}`}>
          <ChevronDown className="w-5 h-5 rotate-90" stroke={currentPage === 1 ? "#9ca3af": "#fff" } />
          <p>Prev</p>
        </button>

        {currentPage > 2 && pageBtn(1)}

        {currentPage > 3 && (
          <button className="text-white">
            <p>...</p>
          </button>
        )}

        {currentPage > 1 && pageBtn(currentPage - 1)}
        {pageBtn(currentPage)}
        {currentPage < totalPages && pageBtn(currentPage + 1)}

        {currentPage < totalPages - 2 && (
          <button className="text-white">
            <p>...</p>
          </button>
        )}

        {currentPage < totalPages - 1 && pageBtn(totalPages)}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{ display: totalPages === 1 ? "none" : "flex" }}
          className={`items-center justify-center rounded-lg pl-2 pr-1 py-2 cursor-pointer 
            ${currentPage === totalPages ? "text-gray-400" : "text-white hover:bg-prim-black/40"}`}>
          <p>Next</p>
          <ChevronDown className="w-5 h-5 -rotate-90" stroke={currentPage === totalPages ? "#9ca3af" : "#fff"} />
        </button>
      </span>
    </footer>
  );
};

export default pagination;
