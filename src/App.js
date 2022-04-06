import { MainWortPage, Error404, SavePage, Navbar, GroupPage, ThemePage } from './components'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import className from 'classnames'
import React from 'react'


function App() {
    document.title = process.env?.REACT_APP_NAME || "Deutsch"

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