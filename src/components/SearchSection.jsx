import React from 'react';
import SearchCss from './SearchSection.module.css'
import { useDispatch } from 'react-redux';
import { setIsAddContact, setFormView, setIsGetContact, setSearchValue } from '../features/todo/contactsSlice';

const SearchSection = () => {
  const dispatch = useDispatch();

  const addContact = () => {
    dispatch(setIsGetContact(false));
    dispatch(setFormView(true));
    dispatch(setIsAddContact(true));
  }
  const search = (e) => {
    dispatch(setSearchValue(e.target.value));
  }

  return (
    <div className={SearchCss.search_section}>
         <h3>Find a contact</h3>
         <div className={SearchCss.header}>
         <i className="fa-solid fa-magnifying-glass"></i>
         <input  type="text" placeholder='search'  onChange={(e) => search(e) }/>
        <button onClick={addContact}>Add Contact</button>
         </div>   
    </div>
  )
}

export default SearchSection