import { initialSelected, setSelected } from '../../reducers/mainReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Wort } from './components';
import Themes from '../Themes';
import Select from '../Select';
import React from 'react';

function MainWortPage() {
    const selected = useSelector(state => state.main.selected)
    const group = useSelector(state => state.main.group)
    const theme = useSelector(state => state.main.theme)
    const wort = useSelector(state => state.main.wort)
    const dispatch = useDispatch()

    const [themeList, setThemeList] = React.useState([])

    React.useEffect(_ => {
        setThemeList([])
    }, [theme])

    const clickHandler = (active, themeID) => {
        if (active) {
            setThemeList(themeList.filter(t => t != themeID))
        } else {
            setThemeList([themeID, ...themeList])
        }
    }

    const changeHandler = newGroup => {
        dispatch(setSelected({ selected: newGroup }))
    }

    if (wort.length === 0) return <h1 className='wort_row'>List is empty</h1>
    return (
        <div className='wort_page_wrapper'>
            <div className='group_container'>
                <div style={{ display: "flex", alignItems: "center", margin: "2rem", maxWidth: "300px" }}>
                    <div style={{ marginRight: "5px" }}>
                        groups:
                    </div>
                    <Select
                        groupList={[initialSelected, ...group]}
                        changeHandler={changeHandler}
                        value={selected}
                    />
                </div>
            </div>
            <div className='m_container'>
                <Wort themeList={themeList} />
            </div>
            <div className='s_container'>
                <Themes clickHandler={clickHandler} />
            </div>
        </div>
    )
}

export default MainWortPage