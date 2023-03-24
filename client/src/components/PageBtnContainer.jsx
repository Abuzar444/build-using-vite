import Wrapper from "../assets/wrappers/PageBtnContainer"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useGlobalContext } from "../context/AppContext";


const PageBtnContainer = () => {
  const { numOfPages, page,changePage } = useGlobalContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevBtn = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  }

  const nextBtn = () => {
    let newPage = page + 1;
    
    if (newPage > numOfPages) {
      newPage = 1;
    }

    changePage(newPage)
  };

  return (
    <Wrapper>
        <button
          className="prev-btn"
          onClick={prevBtn}
        >
          <HiChevronDoubleLeft/>
        </button>
      <div className="btn-container">
        {
          pages.map((pageNumber) => {
            return (
              <span
                type="button"
                key={pageNumber}
                className={pageNumber === page ? "pageBtn active" : 'pageBtn'}
                onClick={()=> changePage(pageNumber)}
              >
                {pageNumber}
              </span>
            )
          })
        }
      </div>
        <button
          className="next-btn"
          onClick={nextBtn}
        >
          <HiChevronDoubleRight/>
        </button>
    </Wrapper>
  )
}

export default PageBtnContainer
