import React, { useRef, useState } from 'react'
import { editContact, getContactbyId, setFormView, setIsAddContact, setIsGetContact } from '../features/todo/contactsSlice';
import { useDispatch } from 'react-redux';

const GetContactDetails = ({ contact }) => {

    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(contact.firstName);
    const [lastName, setLastName] = useState(contact.lastName);
    const [phone, setPhone] = useState(contact.phone );
    const [email, setEmail] = useState(contact.email);
    const imageRef = useRef(null);

    const updateSubmit = (id) => {

       const newData = {
            id,
            firstName,
            lastName,
            email,
            phone, 
            image: imageRef.current.files[0],
        }

        console.log("data",newData)
        dispatch(editContact(newData));
    
        dispatch(getContactbyId(id));
        dispatch(setIsAddContact(false))
        dispatch(setFormView(true))
        dispatch(setIsGetContact(true));


    }

    return (
        <div>
            <img src={`http://localhost:4000/${contact.avatar}`} alt="user" name='avatar' />
            <input type="file" ref={imageRef} />
            <input type="text" value={firstName} name='firstName' onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" value={lastName} name='lastName' onChange={(e) => setLastName(e.target.value)}/>
            <input type="text" value={phone} name='phone' onChange={(e) => setPhone(e.target.value)}/>
            <input type="text" value={email} name='email' onChange={(e) => setEmail(e.target.value)}/>
            <button onClick={() => updateSubmit(contact._id)}>Save Changes</button>
        </div>
    )
}

export default GetContactDetails