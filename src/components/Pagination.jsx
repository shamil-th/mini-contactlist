import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, setCurrentPage } from '../features/todo/contactsSlice';
import PaginationCss from './Pagination.module.css'

const Pagination = () => {
  const contactsCount = useSelector((state) => state.contacts.contactsCount)
  const currentPageNumber = useSelector((state) => state.contacts.currentPage)
  const searchValue = useSelector((state) => state.contacts.searchValue)
  const itemsPerPage = useSelector((state) => state.contacts.itemsPerPage)

  const dispatch = useDispatch();

  const page = Math.ceil(contactsCount / itemsPerPage);

  const pagenumbers = [];

  if (page > 1) {

    for (let i = 1; i <= page; i++) {
      pagenumbers.push(i)
    };

  };

  const nextPage = () => {
 
    const currentPage = currentPageNumber + 1;
    const params = {
      currentPage,
      itemsPerPage,
      searchValue
    }
    dispatch(getContacts(params));
    dispatch(setCurrentPage(currentPage))
  }

  const previousPage = () => {

    const currentPage = currentPageNumber-1;
    const params = {
      currentPage,
      itemsPerPage,
      searchValue
    }
    dispatch(getContacts(params));
    dispatch(setCurrentPage(currentPage))
  }
  const selectPage = (page) => {
    const currentPage = page;

    const params = {
      currentPage,
      itemsPerPage,
      searchValue
    }
    dispatch(getContacts(params));
    dispatch(setCurrentPage(currentPage))
  }

  return (
    <div className={PaginationCss.pagination}>

      { currentPageNumber > 1 && <button className={PaginationCss.numbers} onClick={previousPage}><i className="fa-solid fa-chevron-left"></i></button>}

      {pagenumbers.map((page) => {
        return <button  className={`${PaginationCss.numbers} ${currentPageNumber === page ? PaginationCss.current : ''}`} key={page} onClick={() => selectPage(page)}>{page}</button>
      })}
      { currentPageNumber < page && <button className={PaginationCss.numbers} onClick={() => nextPage()}><i className="fa-solid fa-chevron-right"></i></button>}

    </div>
  )
}

export default Pagination