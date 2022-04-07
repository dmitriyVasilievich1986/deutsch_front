import { Wort, Group } from './components'
import { useSelector } from 'react-redux'
import Themes from './components/Themes'
import React from 'react'

function MainWortPage() {
    const loading = useSelector(state => state.main.loading)
    const theme = useSelector(state => state.main.theme)
    const wort = useSelector(state => state.main.wort)

    const [themeList, setThemeList] = React.useState([])

    React.useEffect(_ => {
        setThemeList([])
    }, [theme])

    if (loading) return <h1>Loading...</h1>
    else if (wort.length === 0) return <h1 className='wort_row'>List is empty</h1>
    return (
        <div className='wort_page_wrapper'>
            <div className='group_container'>
                <Group />
            </div>
            <div className='m_container'>
                <Wort themeList={themeList} />
            </div>
            <div className='s_container'>
                <Themes themeList={[themeList, setThemeList]} />
            </div>
        </div>
    )
}

export default MainWortPage