import { WortList, WortDescription } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { setState } from 'reduxReducers/mainReducer';
import WortInput from './components/WortInput';
import { NavLink } from "react-router-dom";
import className from 'classnames';
import Themes from '../Themes';
import axios from 'axios';
import React from 'react';


function SavePage() {
    const currentWort = useSelector(state => state.main.currentWort);
    const wortTheme = useSelector(state => state.main.wortTheme);
    const loading = useSelector(state => state.main.loading);
    const group = useSelector(state => state.main.group);
    const dispatch = useDispatch();

    const getThemes = _ => {
        const newList = [];

        wortTheme.map(wt => {
            if (wt.word == currentWort.id) {
                newList.push(wt.theme);
            }
        })
        return newList
    }

    const clickHandler = (active, themeID) => {
        if (active) {
            const wtID = wortTheme.find(wt => wt.word == currentWort.id && wt.theme == themeID);
            deleteHandler(wtID.id);
        } else {
            postHandler(themeID);
        }
    }

    const deleteHandler = wortThemeID => {
        if (loading) return

        axios.delete(`/api/wordtheme/${wortThemeID}/`)
            .then(_ => {
                const newList = wortTheme.filter(wt => wt.id != wortThemeID);

                dispatch(setState({
                    message: { text: "Theme was removed from the word successfuly" },
                    wortTheme: newList,
                    loading: false,
                }));
            })
            .catch(e => {
                dispatch(setState({
                    message: { text: "Theme was not removed from the word", action: "error" },
                    loading: false,
                }));
                console.log(e);
            })
    }

    const postHandler = themeID => {
        if (loading) return

        const data = {
            word: currentWort.id,
            theme: themeID,
        };

        axios.post("/api/wordtheme/", data)
            .then(data => {
                dispatch(setState({
                    message: { text: "Theme was added to the word successfuly" },
                    wortTheme: [data.data, ...wortTheme],
                    loading: false,
                }));
            })
            .catch(e => {
                dispatch(setState({
                    message: { text: "Theme was not added to the word", action: "error" },
                    loading: false,
                }));
                console.log(e);
            })
    }

    // if (group.length == 0) return (
    //     <div className='wort_page_wrapper'>
    //         <div className='s_container' />
    //         <div className='m_container m2'>
    //             Create a group of words first - <NavLink className={className("main_link")} to="/group/">groups</NavLink>
    //         </div>
    //         <div className='s_container' />
    //     </div>
    // )
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