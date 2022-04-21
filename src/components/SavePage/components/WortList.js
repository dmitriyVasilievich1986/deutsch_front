import { setState, initialWort } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import React from 'react'
import axios from 'axios'


function WortList() {
    const currentWort = useSelector(state => state.main.currentWort)
    const wortTheme = useSelector(state => state.main.wortTheme)
    const wort = useSelector(state => state.main.wort)

    const [wortList, setWortList] = React.useState(wort)
    const [search, setSearch] = React.useState("")
    const listRef = React.useRef(null)
    const dispatch = useDispatch()

    React.useEffect(_ => {
        if (listRef.current) {
            listRef.current.getElementsByClassName("active")?.[0]?.scrollIntoView({ behavior: "smooth" })
        }
    }, [listRef])
    React.useEffect(_ => {
        const e = wortList.filter(l => l.id == currentWort.id)
        if (e.length == 0 && wortList.length > 0) {
            dispatch(setState({ currentWort: wortList[0] }))
        }
    }, [wortList])

    React.useEffect(_ => {
        if (search == "" || search == " ") {
            setWortList(wort)
        } else {
            const l = wort.filter(w => w.wort.toLowerCase().includes(search.toLowerCase()))
            setWortList(l)
        }
    }, [search])

    const deleteHandler = id => {
        axios.delete(`/api/wort/${id}/`)
            .then(_ => {
                const w = wort.filter(w => w.id != id)
                const c = w?.[0] || initialWort
                const wtList = wortTheme.filter(wt => wt.wort != id)
                dispatch(setState({
                    wortTheme: wtList,
                    currentWort: c,
                    wort: w,
                }))
            })
            .catch(e => {
                console.log(e)
            })
    }

    if (wort.length === 0 || currentWort === null) return null
    return (
        <div className={className('wort_list_wrapper')}>
            <div className={className("wort_list_inner")}>
                <div className={className('input_row', 'mb2', 'ml2')}>
                    <img src="/static/i/search.png" className='search_icon' />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="search" />
                    <img src="/static/i/eraser.png" onClick={_ => setSearch("")} className="icon" />
                </div>
                <div className={className('wort_list')}>
                    <div ref={listRef}>
                        {wortList.map(w => (
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
        </div>
    )
}

export default WortList