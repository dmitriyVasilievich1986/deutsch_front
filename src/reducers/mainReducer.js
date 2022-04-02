import { createSlice } from '@reduxjs/toolkit'


export const initialSelected = { id: 0, name: "все" }

const initialState = {
    selected: initialSelected,
    group: [],
    wort: [],
}

export const mainReducer = createSlice({
    initialState: initialState,
    name: 'main',
    reducers: {
        setWort: (state, action) => {
            state.wort = action.payload.wort
        },
        setGroup: (state, action) => {
            state.group = action.payload.group
        },
        setSelected: (state, action) => {
            state.selected = action.payload.selected
        },
    },
})

export const { setGroup, setSelected, setWort } = mainReducer.actions


export default mainReducer.reducer