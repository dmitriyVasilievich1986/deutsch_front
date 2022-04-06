import { WortList, WortDescription, ThemeList } from './components'
import { setState, initialWort } from '../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import WortInput from './components/WortInput'
import { NavLink } from "react-router-dom"
import className from 'classnames'
import axios from 'axios'
import React from 'react'

function SavePage() {
    const loading = useSelector(state => state.main.loading)
    const group = useSelector(state => state.main.group)
    const dispatch = useDispatch()

    React.useEffect(_ => {
        dispatch(setState({ loading: true }))
        Promise.all(([
            axios.get("/api/worttheme/"),
            axios.get("/api/group/"),
            axios.get("/api/theme/"),
            axios.get("/api/wort/"),
        ]))
            .then(values => {
                const [wortTheme, group, theme, wort] = values
                const currentWort = wort.data?.[0] || initialWort
                dispatch(setState({
                    wortTheme: wortTheme.data,
                    currentWort: currentWort,
                    group: group.data,
                    theme: theme.data,
                    wort: wort.data,
                    loading: false,
                }))
            })
            .catch(e => {
                dispatch(setState({ loading: false }))
                console.log(e)
            })
    }, [])

    if (loading) return <h1>Loading...</h1>
    else if (group.length == 0) return (
        <div className='wort_page_wrapper'>
            <div className='s_container' />
            <div className='m_container m2'>
                Create a group of words first - <NavLink className={className("main_link")} to="/group/">groups</NavLink>
            </div>
            <div className='s_container' />
        </div>
    )
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
            <div className='s_container'>
                <ThemeList />
            </div>
        </div>
    )
}

export default SavePage