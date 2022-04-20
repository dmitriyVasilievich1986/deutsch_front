import { setState } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import axios from 'axios'
import React from 'react'

function ThemeList() {
    const currentWort = useSelector(state => state.main.currentWort)
    const wortTheme = useSelector(state => state.main.wortTheme)
    const theme = useSelector(state => state.main.theme)
    const wort = useSelector(state => state.main.wort)
    const dispatch = useDispatch()

    const postHandler = themeID => {
        dispatch(setState({ loading: true }))
        const data = {
            wort: currentWort.id,
            theme: themeID,
        }
        axios.post("/api/worttheme/", data)
            .then(data => {
                dispatch(setState({ loading: false, wortTheme: [data.data, ...wortTheme] }))
            })
            .catch(errorHandler)
    }

    const deleteHandler = wortThemeID => {
        dispatch(setState({ loading: true }))
        axios.delete(`/api/worttheme/${wortThemeID}/`)
            .then(_ => {
                const newList = wortTheme.filter(wt => wt.id != wortThemeID)
                dispatch(setState({ loading: false, wortTheme: newList }))
            })
            .catch(errorHandler)
    }

    const errorHandler = e => {
        dispatch(setState({ loading: false }))
        console.log(e)
    }

    if (!wort.length) return null
    return (
        <div className={className("m2")}>
            Themes:
            <div className={className("long_list")}>
                {theme.map(t => {
                    const wt = wortTheme.filter(wt => wt.wort == currentWort.id && wt.theme == t.id)
                    return (
                        <div
                            onClick={_ => !!wt.length ? deleteHandler(wt[0].id) : postHandler(t.id)}
                            className={className("wort_group", { selected: !!wt.length })}
                            key={t.id}
                        >
                            {t.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ThemeList