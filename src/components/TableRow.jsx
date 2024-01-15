import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableCss from './Table.module.css';
import { deleteContact, getContactbyId, getContacts, setAlertText } from '../features/todo/contactsSlice';
import { setIsGetContact, setFormView, setIsAddContact, setAlert } from '../features/todo/contactsSlice';

const TableRow = ({ contact, index }) => {

    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.contacts.currentPage);
    const searchValue = useSelector((state) => state.contacts.searchValue)

    let slNo = ((currentPage - 1) * 4) + 1

    const removeContact = async (id) => {
        const params = {
            currentPage,
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

        await dispatch(getContactbyId(id));
        dispatch(setIsAddContact(false))
        dispatch(setFormView(true))
        dispatch(setIsGetContact(true));
    }


    return (
        <tr className={TableCss.table_row}>
            <td className={TableCss.cell}>{index + slNo}</td>
            <td className={`${TableCss.username} ${TableCss.cell}`}><img src={`http://localhost:4000/${contact.avatar}`} alt="user" className={TableCss.img} /> {contact.firstName} {contact.lastName}</td>
            <td className={TableCss.cell}>{contact.phone}</td>
            <td className={TableCss.cell}>{contact.email}</td>
            <td className={`${TableCss.buttons}  ${TableCss.cell}`}><button className={TableCss.edit} onClick={() => viewDetails(contact._id)}><i className="fa-regular fa-pen-to-square"></i></button>
                <button className={TableCss.delete} onClick={() => removeContact(contact._id)}><i className="fa-regular fa-trash-can"></i></button></td>
        </tr>
    )
}

export default TableRow