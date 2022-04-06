import { createSlice } from '@reduxjs/toolkit'


export const initialWort = { id: 0, wort: "", translate: "", group: 0 }
export const initialSelected = { id: 0, name: "все" }

const initialState = {
    currentWort: initialWort,
    selected: initialSelected,
    loading: true,
    wortTheme: [],
    group: [],
    theme: [],
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
                currentWort: w?.[i] || null,
                wort: w,
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
        setSelected: (state, action) => {
            state.selected = action.payload.selected
        },
    },
})

export const { setGroup, setSelected, setWort, setState } = mainReducer.actions


export default mainReducer.reducer