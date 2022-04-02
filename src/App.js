import MainWortPage from './components/mainWortPage/MainWortPage'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import * as ReactDOMClient from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import React from 'react'


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainWortPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

ReactDOMClient.createRoot(document.getElementById('app'))
    .render(<Provider store={store}><App /></Provider>)