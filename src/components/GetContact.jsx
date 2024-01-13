import React from 'react';
import ContactCss from './AddContact.module.css'
import { useSelector } from 'react-redux';
import GetContactDetails from './GetContactDetails';

const GetContact = () => {

    const contact = useSelector((state) => state.contacts.contact);
    const status = useSelector((state) => state.contacts.status);
    const error = useSelector((state) => state.contacts.error);

  return (
    <div className={ContactCss.form}>
      {status==='succeeded' && <GetContactDetails contact={contact}/>}
      {error && <h5>{error}</h5>}
    </div>
  )
}

export default GetContact