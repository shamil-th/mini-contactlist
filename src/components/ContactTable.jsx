import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../features/todo/contactsSlice';
import TableCss from './Table.module.css';
import TableRow from './TableRow';

const ContactTable = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const status = useSelector((state) => state.contacts.status);
  const error = useSelector((state) => state.contacts.error);
  const pagenum = useSelector((state) => state.contacts.pagenum)
  const searchValue = useSelector((state) => state.contacts.searchValue)

  useEffect(() => {
    const params={
      pagenum,
      searchValue
    }
    dispatch(getContacts(params));
  }, [dispatch,pagenum,searchValue]);

  return (
    <div className={TableCss.contact_table}><table>
      <tbody>
        <tr>
          <th className={TableCss.sl}>sl no</th>
          <th>Name</th>
          <th>Number</th>
          <th>Mail</th>
        </tr>
        {status === 'loading' && <tr><td colSpan="4">Loading...</td></tr>}
        {status === 'failed' && <tr> <td colSpan="4">Error: {error}</td></tr>}
        {status === 'succeeded' && contacts && contacts.length > 0 && (
          <>
            {contacts.map((contact, index) => (
              <TableRow key={contact._id} contact={contact} index={index} />
            ))}
          </>
        )}
      </tbody>
    </table>
    </div>
  )
}

export default ContactTable