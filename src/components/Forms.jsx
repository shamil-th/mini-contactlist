import React from 'react';
import AddContact from './AddContact';
import GetContact from './GetContact';
import { useSelector } from 'react-redux';

const Forms = () => {
  const isAddContact = useSelector((state)=>state.contacts.isAddContact);
  const isGetContact = useSelector((state)=>state.contacts.isGetContact);
  return (
    <>
        { isAddContact && <AddContact/>}
        { isGetContact && <GetContact/>}
    </>
  )
}

export default Forms