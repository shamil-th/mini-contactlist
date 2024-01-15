import React, { useRef, useState } from 'react'
import { editContact, getContactbyId, getContacts, setAlert, setAlertText, setFormView, setIsGetContact } from '../features/todo/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
// import EditCss from './GetContactDetails.module.css'
import EditCss from './AddContact.module.css'

const GetContactDetails = ({ contact }) => {

    const dispatch = useDispatch();

    const currentPage = useSelector((state) => state.contacts.currentPage);
    const searchValue = useSelector((state) => state.contacts.searchValue);
    const [firstName, setFirstName] = useState(contact.firstName);
    const [lastName, setLastName] = useState(contact.lastName);
    const [phone, setPhone] = useState(contact.phone);
    const [email, setEmail] = useState(contact.email);
    const [previewImg, setPreviewImg] = useState(`http://localhost:4000/${contact.avatar}`);
    const imageRef = useRef(null);
    const [error, setError] = useState('');

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

    const updateSubmit = async (id) => {

        if (!firstName || !lastName || !phone || !email) {
            setError('Please fill in all fields');
            return;
        }

        validation();

        if (validation()) {
            setError('Incorrect email or phone format');
            console.log("Incorrect");
            return;
        }

        setError('');

        const newData = {
            id,
            firstName,
            lastName,
            email,
            phone,
            image: imageRef.current.files[0],
        }

        const params = {
            currentPage,
            searchValue
        }

        const message = {
            text : "Contact Edited Successfully",
            class : "edited"
        }

        await dispatch(editContact(newData));
        dispatch(getContactbyId(id));
        dispatch(getContacts(params))
        dispatch(setFormView(false))
        dispatch(setIsGetContact(false));
        dispatch((setAlertText(message)));
        dispatch(setAlert(true))
    }

    const hideForm = () => {
        dispatch(setIsGetContact(false));
        dispatch(setFormView(false))
    }

    const preview = (e) => {
        const previewImage = e.target.files[0]
        setPreviewImg(URL.createObjectURL(previewImage))
    }

    return (
        <div className={EditCss.form}>
            <div className={EditCss.header}>
                <h3>Edit Contact</h3>
                <button className={EditCss.close} onClick={hideForm}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className={EditCss.preview}>
            <div className={EditCss.addImg}><i className="fa-solid fa-plus"></i></div>
                <img src={previewImg} alt="user" name='avatar' />
                <input type="file" ref={imageRef} onChange={preview} />
            </div>
            <div className={EditCss.input_fields}>
                <div className={EditCss.inputform}>
                    <label htmlFor="firstName">First Name {firstName ? null : <span style={{ color: 'red' }}>*</span>}</label>
                    <input type="text" value={firstName} name='firstName' onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className={EditCss.inputform}>
                    <label htmlFor="lastName">Last Name {lastName ? null : <span style={{ color: 'red' }}>*</span>}</label>
                    <input type="text" value={lastName} name='lastName' onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className={EditCss.inputform}>
                    <label htmlFor="phone">Phone {phone ? null : <span style={{ color: 'red' }}>*</span>}</label>
                    <input type="text" value={phone} name='phone' onChange={(e) => setPhone(e.target.value)} maxLength={10}/>
                </div>
                <div className={EditCss.inputform}>
                    <label htmlFor="mail">Email {email ? null : <span style={{ color: 'red' }}>*</span>}</label>
                    <input type="text" value={email} name='email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={EditCss.buttons_section}>
                    <button className={EditCss.cancel} onClick={hideForm}>Cancel</button>
                    <button className={EditCss.submit} onClick={() => updateSubmit(contact._id)}>Save Changes</button>
                </div>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    )
}

export default GetContactDetails