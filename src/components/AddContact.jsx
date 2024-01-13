
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, setIsAddContact, setFormView, getContacts } from '../features/todo/contactsSlice';
import ContactCss from './AddContact.module.css'

const AddContact = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const imageRef = useRef(null);
    const [error, setError] = useState('');
    const previewUrl = "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
    const [previewImg, setPreviewImg] = useState(previewUrl)

    const currentPage = useSelector((state) => state.contacts.currentPage)
    const searchValue = useSelector((state) => state.contacts.searchValue)


    const handleAddContact = async () => {
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

        const params = {
            currentPage,
            searchValue
        }

        await dispatch(addContact(newContact));
        dispatch(getContacts(params));

        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setPreviewImg(previewUrl);
        imageRef.current.value = '';
    };

    const hideForm = () => {
        dispatch(setIsAddContact(false));
        dispatch(setFormView(false));
    }

    const preview = (e) => {
        setPreviewImg('');
        const previewImage = e.target.files[0]
        setPreviewImg(URL.createObjectURL(previewImage))
    }

    return (
        <div className={ContactCss.form}>
            <div className={ContactCss.header}>
            <h4>Contact Details</h4>
            <button className={ContactCss.close} onClick={hideForm}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className={ContactCss.preview}>
                {/* <label htmlFor="image">Image {imageRef.current && imageRef.current.files[0] ? null : <span style={{ color: 'red' }}>*</span>}</label> */}
                <img src={previewImg} alt="user" />
                <input type="file" ref={imageRef} id='image' onChange={preview} />
            </div>
            <div className={ContactCss.input_fields}>
                <div className={ContactCss.inputform}>
                    <label htmlFor="firstName">First Name {firstName ? null : <span style={{ color: 'red' }}>*</span>}</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        id='firstName'
                    />
                </div>
                <div className={ContactCss.inputform}>
                    <label htmlFor="lastName">Last Name {lastName ? null : <span style={{ color: 'red' }}>*</span>}</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        id='lastName'
                    />
                </div>
                <div className={ContactCss.inputform}>
                    <label htmlFor="phone">Phone {phone ? null : <span style={{ color: 'red' }}>*</span>}</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        id='phone'
                    />
                </div>
                <div className={ContactCss.inputform}>
                    <label htmlFor="mail">Email {email ? null : <span style={{ color: 'red' }}>*</span>}</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id='mail'
                    />
                    <div>
                    </div>

                </div>
                <div className={ContactCss.buttons}>
                    <button onClick={handleAddContact}>Save Contact</button>
                </div>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    )
}

export default AddContact;
