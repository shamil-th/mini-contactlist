// import { useState } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {

    console.log(contact.firstName)

    const formData = new FormData();
    formData.append('firstName', contact.firstName);
    formData.append('lastName', contact.lastName);
    formData.append('phone', contact.phone);
    formData.append('email', contact.email);
    formData.append('avatar', contact.image);

    try {
        const response = await axios.post('http://localhost:4000/contact', formData);

        if (!response.data) {
            throw new Error('Failed to add contact');
        }
        return response.data;
    } catch (error) {
        throw new Error('Failed to add contact');
    }
});


export const getContacts = createAsyncThunk('contacts/getContacts', async (data) => {

    const { pagenum, searchValue} = data;
    const itemsPerPage = 4;

    try {
        const response = await axios.get(`http://localhost:4000/contact?page=${pagenum}&size=${itemsPerPage}&search=${searchValue}`);
        if (!response.data.contacts) {
            throw new Error("failed to retrive contacts");
        }
        console.log( response);

        const { contacts, contactsCount } = response.data;

        //  totalCount of data
        console.log(contactsCount[0].totalCount);
        let totalContacts = contactsCount[0].totalCount;
        console.log("total",totalContacts);

        return contacts;

    } catch (error) {
        throw new Error('failed to retrive contacts')
    }
});

export const getContactbyId = createAsyncThunk('contacts/getgetContactbyId', async (id) => {
    try {
        const response = await axios.get(`http://localhost:4000/contact/${id}`);
        if (!response.data) {
            throw new Error('failed to get data');
        }
        return response.data
    } catch (error) {
        throw new Error("failed to retrive data")
    }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
    try {
        const response = await axios.delete(`http://localhost:4000/contact/${id}`)
        if (!response.data) {
            throw new Error("failed to delete contact");
        }
        getContacts();
        return response.data;
    } catch (error) {
        throw new Error('failed to delete contacts');
    }
})

export const editContact = createAsyncThunk('contacts/editContact', async (data) => {

    const id = data.id;

    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('avatar', data.image);

    try {
        const response = await axios.put(`http://localhost:4000/contact/${id}`, formData)

        if (!response.data) {
            throw new Error("filed to edit contact");
        }

        return { id, data: response.data };

    } catch (error) {
        throw new Error("failed to edit contact")
    }
})

const initialState = {
    contacts: [],
    contact: [],
    searchValue:[""],
    pagenum:[1],
    status: 'idle',
    error: null,
    formView: false,
    isAddContact: false,
    isGetContact: false,
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setFormView: (state, action) => {
            state.formView = action.payload;
        },
        setIsAddContact: (state, action) => {
            state.isAddContact = action.payload;
        },
        setIsGetContact: (state, action) => {
            state.isGetContact = action.payload;
        },
        setSearchValue:(state,action) => {
            state.searchValue = action.payload;
        },
        setPagenum:(state,action) => {
            state.pagenum = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.push(action.payload)
            })
            .addCase(getContacts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contacts = action.payload;
            })
            .addCase(getContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contacts = state.contacts.filter((contact) => contact._id !== action.payload);
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getContactbyId.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getContactbyId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contact = action.payload;
            })
            .addCase(getContactbyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editContact.pending, (state) => {
                state.status = 'loading';
            })
            // .addCase(editContact.fulfilled, (state, action) => {
            //     state.status = 'succeeded';
            //     state.contacts = action.payload;
            //     console.log("suceeded")
            // })
            .addCase(editContact.fulfilled, (state, action) => {
                const { id, data } = action.payload;
                state.status = 'succeeded';
                state.contacts = state.contacts.map((contact) =>
                    contact._id === id ? { ...contact, ...data } : contact
                );
            })
            .addCase(editContact.rejected, (action, state) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { setFormView, setIsAddContact, setIsGetContact, setSearchValue, setPagenum } = contactsSlice.actions;
// export const {  } = contactsSlice.actions;
export default contactsSlice.reducer;