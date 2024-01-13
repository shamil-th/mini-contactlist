import React from 'react';
import SearchCss from './SearchSection.module.css'
import { useDispatch } from 'react-redux';
import { setIsAddContact, setFormView, setIsGetContact, setSearchValue, setCurrentPage } from '../features/todo/contactsSlice';
import Alert from './Alert';

const SearchSection = () => {
  const dispatch = useDispatch();

  const addContact = () => {
    dispatch(setIsGetContact(false));
    dispatch(setFormView(true));
    dispatch(setIsAddContact(true));
  }
  const search = (e) => {
    dispatch(setSearchValue(e.target.value));
    dispatch(setCurrentPage(1));
  }

  return (
    <div className={SearchCss.search_section}>
      <h3>Find a contact</h3>
      <div className={SearchCss.header}>
        <div className={SearchCss.search_bar}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder='search' onChange={(e) => search(e)} />
        </div>
        <div><button onClick={addContact}><i className="fa-solid fa-user-plus"></i></button></div> 
        <Alert/>  
      </div>
    </div>
  )
}

export default SearchSection