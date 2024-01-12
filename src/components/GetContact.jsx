import React from 'react';
import ContactCss from './AddContact.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setIsGetContact, setFormView } from '../features/todo/contactsSlice';
import GetContactDetails from './GetContactDetails';

const GetContact = () => {

    const dispatch = useDispatch();
    const contact = useSelector((state) => state.contacts.contact);
    const status = useSelector((state) => state.contacts.status);
    const error = useSelector((state) => state.contacts.error);


    const hideForm = () => {
        dispatch(setIsGetContact(false));
        dispatch(setFormView(false))
    }

  return (
    <div className={ContactCss.form}>
      {status==='succeeded' && <GetContactDetails contact={contact}/>}
      {error && <h5>{error}</h5>}
    <h1 onClick={hideForm}>hide</h1>
    </div>
  )
}

export default GetContact