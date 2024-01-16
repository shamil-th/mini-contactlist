import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, setIsAddContact, setFormView, getContacts, setAlert, setAlertText } from '../features/todo/contactsSlice';
import ContactCss from './AddContact.module.css';

const AddContact = () => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const imageRef = useRef(null);
    const [error, setError] = useState('');
    const previewUrl = "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg";
    const [previewImg, setPreviewImg] = useState(previewUrl);

    const currentPage = useSelector((state) => state.contacts.currentPage);
    const itemsPerPage = useSelector((state) => state.contacts.itemsPerPage);
    const searchValue = useSelector((state) => state.contacts.searchValue);

    function validation() {
        let count = 0;
        let phoneRegx = (/^[0-9]{10}$/);
        if (phoneRegx.test(phone)) {
            count++;
        }
        let emailRegx = /^([a-zA-Z0-9-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})$/;
        if (emailRegx.test(email)) {
            count++;
        }
        if (count !== 2) {
            return true;
        }
    }


    const handleAddContact = async () => {

        if (!firstName || !lastName || !phone || !email || !imageRef.current.files[0]) {
            setError('Please fill in all fields');
            return;
        }

        validation();

        if (validation()) {
            setError('Incorrect email or phone format');
            console.log("Incorrect");
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
            itemsPerPage,
            searchValue
        };
        const message = {
            text: "Contact Added Successfully",
            class: "added"
        };

        await dispatch(addContact(newContact));
        dispatch(getContacts(params));
        dispatch(setIsAddContact(false));
        dispatch(setFormView(false));
        dispatch(setAlertText(message));
        dispatch(setAlert(true));

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
    };

    const preview = (e) => {
        setPreviewImg('');
        const previewImage = e.target.files[0];
        setPreviewImg(URL.createObjectURL(previewImage));
    };

    return (
        <div className={ContactCss.form}>
            <div className={ContactCss.header}>
                <h4>Contact Details</h4>
                <button className={ContactCss.close} onClick={hideForm}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className={ContactCss.preview}>
                <div className={ContactCss.addImg}><i className="fa-solid fa-plus"></i></div>

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
                        maxLength={10}
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
                </div>
                <div className={ContactCss.buttons}>
                    <button onClick={handleAddContact}>Save Contact</button>
                </div>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default AddContact;
