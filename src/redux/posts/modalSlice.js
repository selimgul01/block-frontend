import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isModalOpen: false,
    isEdit: false
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        openModal: (state)=>{
            state.isModalOpen = true
            state.isEdit = false
        },
        closeModal: (state)=>{
            state.isModalOpen = false
            state.isEdit = false
        }, 
        editModal:(state)=>{
            state.isModalOpen = true
            state.isEdit = true
        }
    },
    extraReducers:()=>{}
})


export default modalSlice.reducer;
export const { openModal, closeModal, editModal } = modalSlice.actions
