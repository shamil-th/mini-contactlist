import React, { useEffect } from 'react';
import AlertCss from './Alert.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setAlertText } from '../features/todo/contactsSlice';

const Alert = () => {

    const dispatch = useDispatch();

    const alert = useSelector((state) => state.contacts.alert);
    const alertText = useSelector((state) => state.contacts.alertText);

    function hideAlert() {
        dispatch(setAlert(false))
    }

    useEffect(() => {
        setTimeout(hideAlert, 3000);
        setAlertText("");
    })

    return (
        <div className={AlertCss[alertText.class]}>
            <div className={alert ? AlertCss.success : AlertCss.hide}>{alertText.text}</div>
        </div>
    )
}

export default Alert