import { setState, setMessage } from '../../reducers/mainReducer';
import { WortList, WortDescription } from './components';
import { useSelector, useDispatch } from 'react-redux';
import WortInput from './components/WortInput';
import { NavLink } from "react-router-dom";
import className from 'classnames';
import Themes from '../Themes';
import axios from 'axios';
import React from 'react';

function SavePage() {
    const currentWort = useSelector(state => state.main.currentWort)
    const wortTheme = useSelector(state => state.main.wortTheme)
    const loading = useSelector(state => state.main.loading)
    const group = useSelector(state => state.main.group)
    const dispatch = useDispatch()

    const getThemes = _ => {
        const newList = []
        wortTheme.map(wt => {
            if (wt.wort == currentWort.id) {
                newList.push(wt.theme)
            }
        })
        return newList
    }

    const clickHandler = (active, themeID) => {
        if (active) {
            const wtID = wortTheme.filter(wt => wt.wort == currentWort.id && wt.theme == themeID)[0]
            deleteHandler(wtID.id)
        } else {
            postHandler(themeID)
        }
    }

    const deleteHandler = wortThemeID => {
        axios.delete(`/api/worttheme/${wortThemeID}/`)
            .then(_ => {
                const newList = wortTheme.filter(wt => wt.id != wortThemeID)
                dispatch(setState({
                    message: { text: "Theme was removed from the word successfuly" },
                    wortTheme: newList,
                }))
            })
            .catch(e => {
                dispatch(setMessage({ text: "Theme was not removed from the word", action: "error" }))
                console.log(e)
            })
    }

    const postHandler = themeID => {
        const data = {
            wort: currentWort.id,
            theme: themeID,
        }
        axios.post("/api/worttheme/", data)
            .then(data => {
                dispatch(setState({
                    message: { text: "Theme was added to the word successfuly" },
                    wortTheme: [data.data, ...wortTheme],
                }))
            })
            .catch(e => {
                dispatch(setMessage({ text: "Theme was not added to the word", action: "error" }))
                console.log(e)
            })
    }

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
                <WortInput />
            </div>
            <div className='s_container'>
                <Themes clickHandler={clickHandler} themes={getThemes()} />
            </div>
        </div>
    )
}

export default SavePage