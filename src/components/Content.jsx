import React from 'react';
import ContentCss from './Content.module.css';
import SearchSection from './SearchSection';
import ContactTable from './ContactTable';
import Forms from './Forms';
import { useSelector } from 'react-redux';
import Pagination from './Pagination';

const Content = () => {

  const formView = useSelector((state) => state.contacts.formView);

  return (
    <div className={ContentCss.content}>
      <div className='container'>
        <div className={ContentCss.content_body}>
          <div className={ContentCss.table_section}>
            <SearchSection />
            <div className='table_and_pagination'>
              <ContactTable />
              <Pagination />
            </div>
          </div>
          <div className={!formView ? ContentCss.forms : ContentCss.formsVisible}>
            <Forms />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
