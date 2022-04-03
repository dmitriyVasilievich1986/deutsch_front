import MainWortPage from './components/mainWortPage/MainWortPage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SavePage from './components/SavePage/SavePage'
import Error404 from './components/Error404'
import Navbar from './components/Navbar'
import React from 'react'


function App() {
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