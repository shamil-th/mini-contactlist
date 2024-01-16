import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {

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

    const { currentPage, searchValue, itemsPerPage } = data;
    // const itemsPerPages = 4;

    try {
        const response = await axios.get(`http://localhost:4000/contact?page=${currentPage}&size=${itemsPerPage}&search=${searchValue}`);
        if (!response.data.contacts) {
            throw new Error("failed to retrive contacts");
        }
        const { contacts, contactsCount } = response.data;

        let totalContacts;

        if (contacts.length === 0) {
            totalContacts = 0;
        }
        else {
            totalContacts = contactsCount[0].totalCount;
        }
        const data = { contacts, totalContacts }

        return data;

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
console.log(response.data)
        return { id, data: response.data };

    } catch (error) {
        throw new Error("failed to edit contact")
    }
})

const initialState = {
    contacts: [],
    contactsCount: "",
    contact: [],
    searchValue: [""],
    currentPage: 1,
    itemsPerPage:4,
    status: 'idle',
    error: null,
    formView: false,
    isAddContact: false,
    isGetContact: false,
    alert: false,
    alertText:[],
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
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state,action) => {
            state.itemsPerPage = action.payload;
        },
        setAlert: (state, action) => {
            state.alert = action.payload;
        },
        setAlertText: (state, action) => {
            state.alertText = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addContact.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(getContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contacts = action.payload.contacts;
                state.contactsCount = action.payload.totalContacts;
            })
            .addCase(getContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
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
            .addCase(editContact.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(editContact.rejected, (action, state) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { setFormView, setIsAddContact, setIsGetContact, setSearchValue, setCurrentPage, setAlert, setAlertText } = contactsSlice.actions;
export default contactsSlice.reducer;