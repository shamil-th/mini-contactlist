import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableCss from './Table.module.css';
import { deleteContact, getContactbyId, getContacts, setAlertText } from '../features/todo/contactsSlice';
import { setIsGetContact, setFormView, setIsAddContact, setAlert } from '../features/todo/contactsSlice';

const TableRow = ({ contact, index }) => {

    const [toggle,setToggle] = useState(false)

    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.contacts.currentPage);
    const itemsPerPage = useSelector((state) => state.contacts.itemsPerPage);
    const searchValue = useSelector((state) => state.contacts.searchValue)

    let slNo = ((currentPage - 1) * itemsPerPage) + 1

    const removeContact = async (id) => {
        const params = {
            currentPage,
            itemsPerPage,
            searchValue
        }
        const message = {
            text: "Contact Deleted Successfully",
            class: "delete"
        }
        await dispatch(deleteContact(id));
        dispatch(getContacts(params));
        dispatch((setAlertText(message)));
        dispatch(setAlert(true))
    }

    const viewDetails = async (id) => {
        dispatch(setIsGetContact(false));
        await dispatch(getContactbyId(id));
        dispatch(setIsAddContact(false))
        dispatch(setFormView(true))
        dispatch(setIsGetContact(true));
    }


    return (
        <tr className={TableCss.table_row}>
            <td>{index + slNo}</td>
            <td className={TableCss.username}><img src={`http://localhost:4000/${contact.avatar}`} alt="user" className={TableCss.img} /> {contact.firstName} {contact.lastName}</td>
            <td>{contact.phone}</td>
            <td>{contact.email}</td>
            {!toggle? <td className={TableCss.buttons}><button className={TableCss.edit} onClick={() => viewDetails(contact._id)}><i className="fa-regular fa-pen-to-square"></i></button>
                <button className={TableCss.delete} onClick={()=>setToggle(true)}><i className="fa-regular fa-trash-can"></i></button>
                </td>:
                <td className={TableCss.confirm_cell}>Are you sure<button  className={`${TableCss.delete} ${TableCss.confirmation}`} onClick={() => removeContact(contact._id)}>Yes</button><button className={`${TableCss.edit} ${TableCss.confirmation}`} onClick={()=>setToggle(false)}>No</button></td>}
        </tr>
    )
}

export default TableRow