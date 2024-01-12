import React from 'react';
import HeaderCss from './Header.module.css'

const Header = () => {
    return (
        <div className={HeaderCss.header}>
            <div className='container'>
                <div className={HeaderCss.navbar}>
                    <h4>CONTACT LIST</h4>
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