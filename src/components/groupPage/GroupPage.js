import GroupList from './components/GroupList'
import React from 'react'

function GroupPage() {
    return (
        <div className='wort_page_wrapper'>
            <div className='s_container' />
            <div className='m_container mt2'>
                <GroupList />
            </div>
            <div className='s_container' />
        </div>
    )
}

export default GroupPage