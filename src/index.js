import * as ReactDOMClient from 'react-dom/client'
import { Provider } from 'react-redux'
import './styles/style.scss'
import store from './store'
import React from 'react'
import App from './App'

ReactDOMClient.createRoot(document.getElementById('app'))
    .render(<Provider store={store}><App /></Provider>)