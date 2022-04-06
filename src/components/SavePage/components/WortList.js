import { setState, initialWort } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import React from 'react'
import axios from 'axios'


function WortList() {
    const currentWort = useSelector(state => state.main.currentWort)
    const wortTheme = useSelector(state => state.main.wortTheme)
    const wort = useSelector(state => state.main.wort)
    const [search, setSearch] = React.useState("")
    const listRef = React.useRef(null)
    const dispatch = useDispatch()

    React.useEffect(_ => {
        if (listRef.current) {
            listRef.current.getElementsByClassName("active")?.[0]?.scrollIntoView({ behavior: "smooth" })
        }
    }, [listRef])

    const searchList = _ => {
        if (search == "" || search == " ") return wort
        const l = wort.filter(w => w.wort.includes(search))
        const e = l.filter(l => l.id == currentWort.id)
        if (e.length == 0 && l.length > 0) {
            dispatch(setState({ currentWort: l[0] }))
        }
        return l
    }

    const deleteHandler = id => {
        dispatch(setState({ loading: true }))
        axios.delete(`/api/wort/${id}/`)
            .then(_ => {
                const w = wort.filter(w => w.id != id)
                const c = w?.[0] || initialWort
                const wtList = wortTheme.filter(wt => wt.wort != id)
                dispatch(setState({
                    wortTheme: wtList,
                    currentWort: c,
                    loading: false,
                    wort: w,
                }))
            })
            .catch(e => {
                console.log(e)
                dispatch(setState({ loading: false }))
            })
    }

    if (wort.length === 0 || currentWort === null) return null
    return (
        <div className={className('m2')}>
            <div className={className('input_row', 'mb2')}>
                <img src="/static/i/search.png" className='search_icon' />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="search" />
                <img src="/static/i/eraser.png" onClick={_ => setSearch("")} className="icon" />
            </div>
            <div className={className('wort_list')}>
                <div ref={listRef}>
                    {searchList().map(w => (
                        <div className={className("input_row")} key={w.id}>
                            <div
                                className={className("wort", { active: w.id == currentWort.id })}
                                onClick={_ => dispatch(setState({ currentWort: w }))}
                            >
                                {w.wort}<div className={className("ml2", "mr2")}>/</div>{w.translate}
                            </div>
                            <img src="/static/i/bin.png" onClick={_ => deleteHandler(w.id)} className="icon" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WortList