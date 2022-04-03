import { WortList, WortDescription } from './components'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../reducers/mainReducer'
import axios from 'axios'
import React from 'react'

function SavePage() {
    const loading = useSelector(state => state.main.loading)
    const wort = useSelector(state => state.main.wort)
    const dispatch = useDispatch()

    React.useEffect(_ => {
        dispatch(setState({ loading: true }))
        axios.get("/api/wort/")
            .then(data => {
                const w = data.data
                const c = w?.[0] || null
                axios.get("/api/group/")
                    .then(data => {
                        const g = data.data
                        dispatch(setState({
                            currentWort: c,
                            loading: false,
                            group: g,
                            wort: w,
                        }))
                    })
                    .catch(e => {
                        console.log(e)
                        dispatch(setState({ loading: false }))
                    })
            })
            .catch(e => {
                console.log(e)
                dispatch(setState({ loading: false }))
            })
    }, [])

    if (loading) return <h1>Loading...</h1>
    else if (wort.length === 0) return <h1>No data</h1>
    return (
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <WortList />
            <WortDescription />
        </div>
    )
}

export default SavePage