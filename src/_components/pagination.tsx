'use client';
import React, { FC, useEffect } from 'react';

interface Props {
  currentPage: number;
  onChangeCurrentPage: (page: number) => void;
  numberPages: number;
  callBack?: () => void;
}

const Pagination: FC<Props> = ({
  currentPage,
  onChangeCurrentPage,
  numberPages,
  callBack,
}) => {
  const goToPreviewPage = () => {
    onChangeCurrentPage(currentPage - 1);
    if (callBack) {
      callBack();
    }
  };

  const goToSpecificPage = (pageNumber: number) => {
    onChangeCurrentPage(pageNumber);
    if (callBack) {
      callBack();
    }
  };

  const goToNextPage = () => {
    onChangeCurrentPage(currentPage + 1);
    if (callBack) {
      callBack();
    }
  };
  const pagingArray = Array.from(Array(numberPages).keys());

  const sliceIndex =
    currentPage % 3 === 0
      ? currentPage
      : (currentPage - 1) % 3 === 0
      ? currentPage - 1
      : (currentPage - 2) % 3 === 0
      ? currentPage - 2
      : 0;

  useEffect(() => {
    if (currentPage >= numberPages) {
      // if that is the case, go to the first page
      onChangeCurrentPage(0);
      if (callBack) {
        callBack();
      }
    }
  }, [numberPages]);

  return (
    <ul className="pagination">
      <li className="pagination__item">
        <button
          className="pagination__button arrow"
          disabled={currentPage === 0}
          onClick={() => goToPreviewPage()}
        >
          <i className="icon-chevron-left"></i>
        </button>
      </li>

      {numberPages > 7 ? (
        <>
          {currentPage <= 2 ? (
            <>
              <li className="pagination__item">
                <button
                  className={`pagination__button ${
                    pagingArray[0] === currentPage ? 'active' : ''
                  }`}
                  onClick={() => goToSpecificPage(pagingArray[0])}
                >
                  {pagingArray[0] + 1}
                </button>
              </li>

              {pagingArray
                .slice(sliceIndex + 1, sliceIndex + 5)
                .map((number) => (
                  <li className="pagination__item" key={number}>
                    <button
                      className={`pagination__button ${
                        number === currentPage ? 'active' : ''
                      }`}
                      onClick={() => goToSpecificPage(number)}
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}

              <li className="pagination__item">
                <button>...</button>
              </li>

              {pagingArray.slice(numberPages - 1, numberPages).map((number) => (
                <li className="pagination__item" key={number}>
                  <button
                    className={`pagination__button ${
                      number === currentPage ? 'active' : ''
                    }`}
                    onClick={() => goToSpecificPage(number)}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </>
          ) : currentPage >= 2 && currentPage <= numberPages - 5 ? (
            <>
              <li className="pagination__item">
                <button
                  className={`pagination__button ${
                    pagingArray[0] === currentPage ? 'active' : ''
                  }`}
                  onClick={() => goToSpecificPage(pagingArray[0])}
                >
                  {pagingArray[0] + 1}
                </button>
              </li>
              <li className="pagination__item">
                <button>...</button>
              </li>

              {pagingArray
                .slice(currentPage - 1, currentPage + 2)
                .map((number) => (
                  <li className="pagination__item" key={number}>
                    <button
                      className={`pagination__button ${
                        number === currentPage ? 'active' : ''
                      }`}
                      onClick={() => goToSpecificPage(number)}
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}

              <li className="pagination__item">
                <button>...</button>
              </li>

              <li className="pagination__item">
                <button
                  className={`pagination__button ${
                    pagingArray[pagingArray.length - 1] === currentPage
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    goToSpecificPage(pagingArray[pagingArray.length - 1])
                  }
                >
                  {pagingArray[pagingArray.length - 1] + 1}
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="pagination__item">
                <button
                  className={`pagination__button ${
                    pagingArray[0] === currentPage ? 'active' : ''
                  }`}
                  onClick={() => goToSpecificPage(pagingArray[0])}
                >
                  {pagingArray[0] + 1}
                </button>
              </li>
              <li className="pagination__item">
                <button>...</button>
              </li>

              {pagingArray
                .slice(numberPages - 5, numberPages + 1)
                .map((number) => (
                  <li className="pagination__item" key={number}>
                    <button
                      className={`pagination__button ${
                        number === currentPage ? 'active' : ''
                      }`}
                      onClick={() => goToSpecificPage(number)}
                    >
                      {number + 1}
                    </button>
                  </li>
                ))}
            </>
          )}
        </>
      ) : (
        <>
          {pagingArray.map((number) => (
            <li className="pagination__item" key={number}>
              <button
                className={`pagination__button ${
                  number === currentPage ? 'active' : ''
                }`}
                onClick={() => goToSpecificPage(number)}
              >
                {number + 1}
              </button>
            </li>
          ))}
        </>
      )}

      <li className="pagination__item">
        <button
          className="pagination__button arrow"
          disabled={currentPage === numberPages - 1}
          onClick={() => goToNextPage()}
        >
          <i className="icon-chevron-right"></i>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
