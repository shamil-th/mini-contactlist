import React from 'react';
import AlertCss from './Alert.module.css';
import { useSelector } from 'react-redux';

const Alert = () => {
    const alert = useSelector((state) => state.contacts.alert );

  return (
    <div className={AlertCss.alert}>
        {alert && <div className={AlertCss.success}>Contact Added Successfully</div>}
        </div>
  )
}

export default Alert