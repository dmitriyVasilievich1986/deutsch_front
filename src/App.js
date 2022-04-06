import { MainWortPage, Error404, SavePage, Navbar, GroupPage, ThemePage } from './components'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { setState } from './reducers/mainReducer'
import { useDispatch } from 'react-redux'
import className from 'classnames'
import axios from 'axios'
import React from 'react'


function App() {
    document.title = process.env?.REACT_APP_NAME || "Deutsch"
    const dispatch = useDispatch()

    React.useEffect(_ => {
        dispatch(setState({ loading: true }))
        Promise.all(([
            axios.get("/api/worttheme/"),
            axios.get("/api/group/"),
            axios.get("/api/theme/"),
            axios.get("/api/wort/"),
        ]))
            .then(values => {
                const [wortTheme, group, theme, wort] = values
                const currentWort = wort.data?.[0] || initialWort
                dispatch(setState({
                    wortTheme: wortTheme.data,
                    currentWort: currentWort,
                    group: group.data,
                    theme: theme.data,
                    wort: wort.data,
                    loading: false,
                }))
            })
            .catch(e => {
                dispatch(setState({ loading: false }))
                console.log(e)
            })
    }, [])

    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<MainWortPage />} />
                    <Route path="/group" element={<GroupPage />} />
                    <Route path="/theme" element={<ThemePage />} />
                    <Route path="/save" element={<SavePage />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
            <div className={className("empty_block")} />
        </div>
    )
}

export default App