import { WortList, WortDescription, ThemeList } from './components'
import WortInput from './components/WortInput'
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'
import className from 'classnames'
import React from 'react'

function SavePage() {
    const loading = useSelector(state => state.main.loading)
    const group = useSelector(state => state.main.group)

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