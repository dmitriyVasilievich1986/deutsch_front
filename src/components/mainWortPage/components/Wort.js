import { useSelector, useDispatch } from 'react-redux';
import { setState } from 'reduxReducers/mainReducer';
import CopyClipboard from './CopyClipboard';
import { initialWord } from 'constants';
import HidenWort from './HidenWort';
import className from 'classnames';
import React from 'react';


function Wort(props) {
    const currentWort = useSelector(state => state.main.currentWort);
    const wortTheme = useSelector(state => state.main.wortTheme);
    const selected = useSelector(state => state.main.selected);
    const word = useSelector(state => state.main.word);
    const dispatch = useDispatch();

    const [reverse, setReverse] = React.useState(false);
    const [wortList, setWortList] = React.useState([]);

    const randWort = _ => {
        if (wortList.length > 1) {
            const randomIndex = Math.floor(Math.random() * wortList.length - 1);
            const randomWord = wortList.filter(w => w.id != currentWort.id)[randomIndex];
            dispatch(setState({ currentWort: randomWord }));
        } else if (wortList.length == 1) {
            dispatch(setState({ currentWort: wortList[0] }));
        }
    }

    React.useEffect(_ => {
        randWort();
    }, [wortList])

    React.useEffect(_ => {
        const themeList = wortTheme.filter(wt => props.themeList.includes(wt.theme)).map(t => t.wort);
        const wList = word
            .filter(w => (
                (themeList.includes(w.id) || themeList.length == 0) &&
                (w.group == selected.name || selected.id == 0)
            ))
        setWortList(wList);
    }, [props.themeList, selected])

    const showWort = _ => {
        return (
            <div
                style={{ textAlign: "end", cursor: "pointer", minWidth: "100px" }}
                onClick={randWort}
            >
                <p>
                    {reverse ? currentWort.translate : currentWort.word}
                </p>
            </div>
        )
    }

    const Description = _ => {
        if (!currentWort?.description) return null
        return (
            <div className={className("tooltip")}>
                <img
                    src='/static/i/question_mark.png'
                    className={className("icon")}
                />
                <textarea
                    className={className("tooltip_text")}
                    value={currentWort.description}
                    style={{ resize: "none" }}
                    disabled={true}
                    rows="10"
                />
            </div>
        )
    }

    if (currentWort === null || wortList.length === 0) return <h1 className='wort_row'>List is empty</h1>
    return (
        <div className='wort_wrapper'>
            <div className={className('m2')} style={{ display: "flex" }}>
                Words count: {wortList.length}
                <div className={className("tooltip")}>
                    <img
                        src='/static/i/question_mark.png'
                        className={className("icon")}
                    />
                    <span className={className("tooltip_text")}>
                        {wortList.map(w => (
                            <div
                                onClick={_ => dispatch(setState({ currentWort: w }))}
                                className={className("row")}
                                key={w.id}
                            >
                                {w.word} / {w.translate}
                            </div>
                        ))}
                    </span>
                </div>
            </div>
            <div className='wort_row'>
                <CopyClipboard wort={currentWort.word} />
                <Description />
                {showWort()}
                <img
                    onClick={_ => setReverse(!reverse)}
                    src='/static/i/reverse.png'
                    className='reverse_image'
                />
                <HidenWort wort={reverse ? currentWort.word : currentWort.translate} />
            </div>
        </div>
    )
}

export default Wort