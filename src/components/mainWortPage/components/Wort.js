import { setState } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import CopyClipboard from './CopyClipboard'
import HidenWort from './HidenWort'
import className from 'classnames'
import React from 'react'

function Wort(props) {
    const currentWort = useSelector(state => state.main.currentWort)
    const wortTheme = useSelector(state => state.main.wortTheme)
    const selected = useSelector(state => state.main.selected)
    const wort = useSelector(state => state.main.wort)
    const dispatch = useDispatch()

    const [reverse, setReverse] = React.useState(false)
    const [wortList, setWortList] = React.useState([])

    const randWort = _ => {
        const i = Math.floor(Math.random() * wortList.length)
        dispatch(setState({ currentWort: wort[i] }))
    }

    React.useEffect(_ => {
        randWort()
    }, [wortList])

    React.useEffect(_ => {
        const themeList = wortTheme.filter(wt => props.themeList.includes(wt.theme)).map(t => t.wort)
        const wList = wort
            .filter(w => (
                (themeList.includes(w.id) || themeList.length == 0) &&
                (w.group == selected.id || selected.id == 0)
            ))
        setWortList(wList)
    }, [props.themeList, selected])

    const showWort = _ => {
        return (
            <div
                style={{ textAlign: "end", cursor: "pointer" }}
                onClick={randWort}
            >
                <p>
                    {reverse ? currentWort.translate : currentWort.wort}
                </p>
            </div>
        )
    }

    if (currentWort === null) return null
    else if (wortList.length === 0) return <h1 className='wort_row'>List is empty</h1>
    return (
        <div className='wort_wrapper'>
            <div className={className('m2', "tooltip")}>
                Количество слов: {wortList.length}
                <span className={className("tooltip_text")}>
                    {wortList.map(w => (
                        <div key={w.id} className={className("row")}>{w.wort} / {w.translate}</div>
                    ))}
                </span>
            </div>
            <div className='wort_row'>
                <CopyClipboard wort={currentWort.wort} />
                {showWort()}
                <img
                    onClick={_ => setReverse(!reverse)}
                    src='/static/i/reverse.png'
                    className='reverse_image'
                />
                <HidenWort wort={reverse ? currentWort.wort : currentWort.translate} />
            </div>
        </div>
    )
}

export default Wort