import { wordThemeValidator, themeValidator, groupValidator, wordValidator } from './classes';
import { MainWortPage, Error404, SavePage, Navbar, ThemePage } from './components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { setState } from 'reduxReducers/mainReducer';
import { useDispatch } from 'react-redux';
import Alert from './components/Alert';
import { initialWord } from 'constants';
import className from 'classnames';
import axios from 'axios';
import React from 'react';


function App() {
    document.title = process.env?.REACT_APP_NAME || "Deutsch";
    const dispatch = useDispatch();

    React.useEffect(_ => {
        dispatch(setState({ loading: true }));

        Promise.all(([
            axios.get("/api/wordtheme/"),
            axios.get("/api/group/"),
            axios.get("/api/theme/"),
            axios.get("/api/word/"),
        ]))
            .then(values => {
                const [wordtheme, groups, theme, words] = values;
                const wordsList = words.data.filter(w => wordValidator(w))

                dispatch(setState({
                    wortTheme: wordtheme.data.filter(wt => wordThemeValidator(wt)),
                    theme: theme.data.filter(t => themeValidator(t)),
                    group: groups.data.filter(g => groupValidator(g)),
                    currentWort: wordsList?.[0] || initialWord,
                    word: wordsList,
                    loading: false,
                }));
            })
            .catch(e => {
                dispatch(setState({ loading: false }));
                console.log(e);
            })
    }, [])

    return (
        <div>
            <BrowserRouter>
                <Navbar />

                <Alert />

                <Routes>
                    <Route exact path="/" element={<MainWortPage />} />
                    {/* <Route path="/group" element={<GroupPage />} /> */}
                    <Route path="/theme" element={<ThemePage />} />
                    <Route path="/save" element={<SavePage />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>

            <div className={className("empty_block")} />
        </div>
    )
}

export default App