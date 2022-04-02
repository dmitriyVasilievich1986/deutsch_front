import { setGroup, setWort, setSelected } from './reducers/mainReducer'
import { Provider, useDispatch } from 'react-redux'
import * as ReactDOMClient from 'react-dom/client'
import Wort from './components/wort'
import store from './store'
import React from 'react'
import axios from 'axios'
import Group from './components/group'


function App() {
    const dispatch = useDispatch()
    React.useEffect(_ => {
        axios.get("/api/group/")
            .then(d => {
                const g = d.data
                dispatch(setGroup({ group: g }))
            })
            .catch(e => console.log(e))
        axios.get("/api/wort/")
            .then(w => {
                dispatch(setWort({ wort: w.data }))
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <div>
            <Group />
            <Wort />
        </div>
    )
}

ReactDOMClient.createRoot(document.getElementById('app'))
    .render(<Provider store={store}><App /></Provider>)