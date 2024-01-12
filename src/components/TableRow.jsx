import React from 'react';
import { useDispatch } from 'react-redux';
import TableCss from './Table.module.css';
import { deleteContact, getContactbyId, getContacts } from '../features/todo/contactsSlice';
import { setIsGetContact, setFormView, setIsAddContact } from '../features/todo/contactsSlice';

const TableRow = ({ contact, index }) => {

    const dispatch = useDispatch();
    // const isGetContact = useSelector((state) => state.contacts.isGetContact);


    const removeContact = (id) => {
        dispatch(deleteContact(id));
        dispatch(getContacts())
    }

    const viewDetails = (id) => {
        dispatch(getContactbyId(id));
        dispatch(setIsAddContact(false))
        dispatch(setFormView(true))
        dispatch(setIsGetContact(true));
    }

    return (
        <tr className={TableCss.table_row} onClick={() => viewDetails(contact._id)}>
            <td>{index + 1}</td>
            <td className={TableCss.username}><img src={`http://localhost:4000/${contact.avatar}`} alt="user" className={TableCss.img} /> {contact.firstName} {contact.lastName}</td>
            <td>{contact.phone}</td>
            <td>{contact.email}</td>
            <td onClick={() => removeContact(contact._id)}>delete</td>
        </tr>
    )
}

export default TableRow