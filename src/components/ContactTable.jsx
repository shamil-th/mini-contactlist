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
  const currentPage = useSelector((state) => state.contacts.currentPage);
  const itemsPerPage = useSelector((state) => state.contacts.itemsPerPage);
  const searchValue = useSelector((state) => state.contacts.searchValue);

  useEffect(() => {
    const params = {
      currentPage,
      itemsPerPage,
      searchValue
    };
    dispatch(getContacts(params));
  }, [dispatch, currentPage, searchValue,itemsPerPage]);

  return (
    <div className={TableCss.contact_table}>
      <table>
        <thead className={TableCss.header}>
          <tr>
            <th className={TableCss.sl}>Sl No</th>
            <th>Name</th>
            <th>Number</th>
            <th>Mail</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* {status === 'loading' && <tr><td colSpan="4">Loading...</td></tr>} */}
          {status === 'failed' && <tr><td colSpan="4">Error: {error}</td></tr>}
          {status === 'succeeded' && contacts && contacts.length > 0 &&
            contacts.map((contact, index) => (
              <TableRow key={contact._id} contact={contact} index={index} />
            ))
          }
        </tbody>
      </table>
      {contacts.length === 0 && (<>No Data Found</>)}
    </div>
  );
};

export default ContactTable;
