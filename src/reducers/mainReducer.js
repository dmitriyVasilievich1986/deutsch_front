import { createSlice } from '@reduxjs/toolkit'


export const initialSelected = { id: 0, name: "все" }

const initialState = {
    selected: initialSelected,
    currentWort: null,
    group: [],
    wort: [],
}

export const mainReducer = createSlice({
    initialState: initialState,
    name: 'main',
    reducers: {
        setWort: (state, action) => {
            const w = action.payload?.wort || state.wort
            const i = Math.floor(Math.random() * w.length)
            return {
                ...state,
                currentWort: w[i],
                wort: w,
            }
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