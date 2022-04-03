import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../reducers/mainReducer'
import { Wort, Group } from './components'
import axios from 'axios'
import React from 'react'

function MainWortPage() {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.main.loading)

    React.useEffect(_ => {
        dispatch(setState({ loading: true }))
        axios.get("/api/group/")
            .then(data => {
                const g = data.data
                dispatch(setState({ group: g, loading: false }))
            })
            .catch(e => {
                dispatch(setState({ loading: false }))
                console.log(e)
            })
    }, [])

    if (loading) return <h1>Loading...</h1>
    return (
        <div className='wort_page_wrapper'>
            <div className='group_container'>
                <Group />
            </div>
            <div className='m_container'>
                <Wort />
            </div>
            <div className='s_container' />
        </div>
    )
}

export default MainWortPage