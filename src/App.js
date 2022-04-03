import { MainWortPage, Error404, SavePage, Navbar } from './components'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'


function App() {
    document.title = process.env?.REACT_APP_NAME || "document"

    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<MainWortPage />} />
                    <Route path="/save" element={<SavePage />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App