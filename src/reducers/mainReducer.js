import { initialWord, initialSelected } from 'constants';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selected: initialSelected,
    currentWort: initialWord,
    message: null,
    loading: true,
    wortTheme: [],
    group: [],
    theme: [],
    word: [],
}

export const mainReducer = createSlice({
    initialState: initialState,
    name: 'main',
    reducers: {
        setWort: (state, action) => {
            const w = action.payload?.word || state.word
            const i = Math.floor(Math.random() * w.length)
            return {
                ...state,
                currentWord: w?.[i] || initialWord,
                word: w,
            }
        },
        setState: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        setGroup: (state, action) => {
            state.group = action.payload.group
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        setSelected: (state, action) => {
            state.selected = action.payload.selected
        },
    },
})

export const { setGroup, setSelected, setWort, setState, setMessage } = mainReducer.actions


export default mainReducer.reducer