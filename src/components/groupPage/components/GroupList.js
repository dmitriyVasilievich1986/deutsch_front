import { setState } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import InputWort from './InputWort'
import axios from 'axios'
import React from 'react'


function GroupList() {
    const loading = useSelector(state => state.main.loading)
    const group = useSelector(state => state.main.group)
    const dispatch = useDispatch()

    React.useEffect(_ => {
        dispatch(setState({ loading: true }))
        axios.get("/api/group/")
            .then(data => {
                const g = data.data
                dispatch(setState({ loading: false, group: g }))
            })
            .catch(e => {
                console.log(e)
                dispatch(setState({ loading: false }))
            })
    }, [])

    if (loading) return <h1>Loading...</h1>
    return (
        <div style={{ flex: "3 400px" }}>
            Groups:
            {group.map(g => <InputWort key={g.id} {...g} />)}
            <InputWort id={0} name="" new />
        </div>
    )
}

export default GroupList