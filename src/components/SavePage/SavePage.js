import { setState, initialWort } from '../../reducers/mainReducer'
import { WortList, WortDescription } from './components'
import { useSelector, useDispatch } from 'react-redux'
import WortInput from './components/WortInput'
import className from 'classnames'
import axios from 'axios'
import React from 'react'

function SavePage() {
    const loading = useSelector(state => state.main.loading)
    const dispatch = useDispatch()

    React.useEffect(_ => {
        dispatch(setState({ loading: true }))
        axios.get("/api/wort/")
            .then(data => {
                const w = data.data
                const c = w?.[0] || initialWort
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
    return (
        <div className='wort_page_wrapper'>
            <div className='s_container'>
                <WortDescription />
            </div>
            <div className='m_container'>
                <WortList />
                <div className={className("empty_block")} />
                <WortInput />
            </div>
            <div className='s_container' />
        </div>
    )
}

export default SavePage