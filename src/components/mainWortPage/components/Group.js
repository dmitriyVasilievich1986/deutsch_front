import { setSelected, initialSelected, setWort } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import React from 'react'
import axios from 'axios'

function Group() {
    const selected = useSelector(state => state.main.selected)
    const group = useSelector(state => state.main.group)
    const wort = useSelector(state => state.main.wort)
    const groupList = [initialSelected, ...group]
    const dispatch = useDispatch()

    React.useEffect(_ => {
        const path = selected.id == 0 ? "/api/wort/" : `/api/group/${selected.id}/`
        axios.get(path)
            .then(data => {
                const w = selected.id == 0 ? data.data : data.data.wort
                dispatch(setWort({ wort: w }))
            })
            .catch(e => console.log(e))
    }, [selected])

    const wortCount = _ => {
        if (wort.length) {
            return `Количество слов: ${wort.length}`
        }
        return null
    }

    return (
        <div className='m2'>
            <p>Groups:</p>
            <div className='list_wrapper m2'>
                {groupList.map((g, i) => (
                    <div
                        className={className("wort", { active: g.id == selected.id })}
                        onClick={_ => dispatch(setSelected({ selected: g }))}
                        key={i}
                    >
                        {g.name}
                    </div>
                )
                )}
            </div>
            {/* {wortCount()} */}
        </div>
    )
}

export default Group