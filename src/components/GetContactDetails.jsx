import React, { useRef, useState } from 'react'
import { editContact, getContactbyId, getContacts, setFormView, setIsGetContact } from '../features/todo/contactsSlice';
import { useDispatch } from 'react-redux';
import EditCss from './GetContactDetails.module.css'

const GetContactDetails = ({ contact }) => {

    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(contact.firstName);
    const [lastName, setLastName] = useState(contact.lastName);
    const [phone, setPhone] = useState(contact.phone );
    const [email, setEmail] = useState(contact.email);
    const [previewImg, setPreviewImg] = useState(`http://localhost:4000/${contact.avatar}`)
    const imageRef = useRef(null);

    const updateSubmit = async (id) => {

       const newData = {
            id,
            firstName,
            lastName,
            email,
            phone, 
            image: imageRef.current.files[0],
        }

        const params = {
            
        }

        console.log("data",newData)
        await dispatch(editContact(newData));
        dispatch(getContactbyId(id));
        dispatch(getContacts(params))
        // dispatch(setIsAddContact(false))
        dispatch(setFormView(false))
        dispatch(setIsGetContact(false));
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
        <div className={EditCss.editForm}>
            <div className={EditCss.header}>
            <h3>Edit Contact</h3>
            </div>
            <div className={EditCss.image}>
            <img src={previewImg} alt="user" name='avatar' />
            <input type="file" ref={imageRef} onChange={preview}/>
            </div>
            <div className={EditCss.inputFields}>
            <input type="text" value={firstName} name='firstName' onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" value={lastName} name='lastName' onChange={(e) => setLastName(e.target.value)}/>
            <input type="text" value={phone} name='phone' onChange={(e) => setPhone(e.target.value)}/>
            <input type="text" value={email} name='email' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={EditCss.buttons_section}>
            <button className={EditCss.cancel} onClick={hideForm}>cancel</button>
            <button className={EditCss.submit} onClick={() => updateSubmit(contact._id)}>Save Changes</button>
            </div>
        </div>
    )
}

export default GetContactDetails