
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, setIsAddContact, setFormView } from '../features/todo/contactsSlice';
import ContactCss from './AddContact.module.css'

const AddContact = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const imageRef = useRef(null);
    const [error, setError] = useState('');

    const handleAddContact = () => {
        if (!firstName || !lastName || !phone || !email || !imageRef.current.files[0]) {
            setError('Please fill in all fields');
            return;
        }

        const newContact = {
            firstName,
            lastName,
            phone,
            email,
            image: imageRef.current.files[0],
        };

        setError('');

        dispatch(addContact(newContact));

        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        imageRef.current.value = '';
    };

    const hideForm = () => {
        dispatch(setIsAddContact(false));
        dispatch(setFormView(false));
    }

    return (
        <div className={ContactCss.form}>
            <h4>Contact Details</h4>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div onClick={hideForm}><i className="fa-regular fa-circle-xmark"></i></div>
            <label htmlFor="firstName">First Name {firstName ? null : <span style={{ color: 'red' }}>*</span>}</label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id='firstName'
            />
            <label htmlFor="lastName">Last Name {lastName ? null : <span style={{ color: 'red' }}>*</span>}</label>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id='lastName'
            />
            <label htmlFor="phone">Phone {phone ? null : <span style={{ color: 'red' }}>*</span>}</label>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id='phone'
            />
            <label htmlFor="mail">Email {email ? null : <span style={{ color: 'red' }}>*</span>}</label>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='mail'
            />
            <label htmlFor="image">Image {imageRef.current && imageRef.current.files[0] ? null : <span style={{ color: 'red' }}>*</span>}</label>
            <input type="file" ref={imageRef} id='image' />
            <div>
                <button onClick={handleAddContact}>Submit</button>
            </div>
        </div>
    )
}

export default AddContact;
