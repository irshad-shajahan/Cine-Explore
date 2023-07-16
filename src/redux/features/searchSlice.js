/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import {createSlice} from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name:'search',
    initialState:{
        data:null
    },
    reducers:{
        setSearch:(state, action)=>{
            state.data = action.payload
        }
    }
})

export const {setSearch} = searchSlice.actions