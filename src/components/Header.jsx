import React from 'react';
import HeaderCss from './Header.module.css';
import Alert from './Alert';
import { useSelector } from 'react-redux';


const Header = () => {

    const contactsCount = useSelector((state) => state.contacts.contactsCount)

    return (
        <div className={HeaderCss.header}>
            <div className='container'>
                <div className={HeaderCss.navbar}>
                    <h4>CONTACT LIST ({contactsCount})</h4>
                    <div className={HeaderCss.alert_box}>
                        <Alert />
                    </div>
                    <div>
                        <ul>
                            <li>Home</li>
                            <li>Favorites</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header