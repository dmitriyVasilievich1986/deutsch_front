import { setState, initialWort } from '../../../reducers/mainReducer'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import axios from 'axios'

function InputWort(props) {
    const [name, setName] = React.useState(props.name)
    const group = useSelector(state => state.main.group)
    const wort = useSelector(state => state.main.wort)
    const dispatch = useDispatch()

    const patchHandler = _ => {
        dispatch(setState({ loading: true }))
        const data = {
            id: props.id,
            name: name,
        }
        axios.patch(`/api/group/${props.id}/`, data)
            .then(data => {
                const g = data.data
                const ng = group.map(gr => gr.id == g.id ? g : gr)
                dispatch(setState({ loading: false, group: ng }))
            })
            .catch(errorHandler)
    }

    const postHandler = _ => {
        dispatch(setState({ loading: true }))
        axios.post("/api/group/", { name: name })
            .then(data => {
                const g = data.data
                dispatch(setState({ loading: false, group: [g, ...group] }))
            })
            .catch(errorHandler)
    }

    const deleteHandler = _ => {
        dispatch(setState({ loading: true }))
        axios.delete(`/api/group/${props.id}/`)
            .then(_ => {
                const g = group.filter(g => g.id != props.id)
                const w = wort.filter(w => w.group != props.id)
                const c = w?.[0] || initialWort
                dispatch(setState({ loading: false, group: g, wort: w, currentWort: c }))
            })
            .catch(errorHandler)
    }

    const errorHandler = e => {
        dispatch(setState({ loading: false }))
        console.log(e)
    }

    const newHandler = _ => {
        if ("new" in props) {
            return <img src="/static/i/save.png" onClick={postHandler} className="icon" />
        }
        return <img src="/static/i/save.png" onClick={patchHandler} className="icon" />
    }

    return (
        <div className='input_row'>
            <input className='input' type="text" value={name} onChange={e => setName(e.target.value)} />
            <img src="/static/i/eraser.png" onClick={_ => setName(props.name)} className="icon" />
            {newHandler()}
            {!("new" in props) && <img src="/static/i/bin.png" onClick={deleteHandler} className="icon" />}
        </div>
    )
}

export default InputWort