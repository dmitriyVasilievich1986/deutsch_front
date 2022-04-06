import { setState, initialWort } from '../../reducers/mainReducer'
import { connect } from 'react-redux'
import React from 'react'
import axios from 'axios'

function InputManagement(props) {
    const [name, setName] = React.useState(props.name)

    const postHandler = _ => {
        if ("postHandler" in props) return props.postHandler()
        props.setState({ loading: true })
        axios.post(`/api/${props.object}/`, { name: name })
            .then(data => {
                const newObject = data.data
                props.setState({
                    [props.object]: [newObject, ...props[props.object]],
                    loading: false,
                })
            })
            .catch(errorHandler)
    }

    const patchHandler = _ => {
        if ("patchHandler" in props) return props.patchHandler()
        props.setState({ loading: true })
        const data = {
            id: props.id,
            name: name,
        }
        axios.patch(`/api/${props.object}/${props.id}/`, data)
            .then(data => {
                const d = data.data
                const newObject = props[props.object].map(no => no.id == d.id ? d : no)
                props.setState({
                    [props.object]: newObject,
                    loading: false,
                })
            })
            .catch(errorHandler)
    }

    const deleteHandler = _ => {
        if ("deleteHandler" in props) return props.deleteHandler()
        props.setState({ loading: true })
        axios.delete(`/api/${props.object}/${props.id}/`)
            .then(_ => {
                const newList = props[props.object].filter(g => g.id != props.id)
                const newWort = props.object == "group" ? props.wort.filter(w => w.group != props.id) : props.wort
                const newCurrentWort = props.object == "group" ? newWort?.[0] || initialWort : props.currentWort
                props.setState({
                    currentWort: newCurrentWort,
                    [props.object]: newList,
                    loading: false,
                    wort: newWort,
                })
            })
            .catch(errorHandler)
    }

    const newHandler = _ => {
        if ("new" in props) {
            return <img src="/static/i/save.png" onClick={postHandler} className="icon" />
        }
        return <img src="/static/i/save.png" onClick={patchHandler} className="icon" />
    }

    const errorHandler = e => {
        props.setState({ loading: false })
        console.log(e)
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

const mapStateToProps = state => ({
    currentWort: state.main.currentWort,
    loading: state.main.loading,
    group: state.main.group,
    theme: state.main.theme,
    wort: state.main.wort,
})

export default connect(mapStateToProps, { setState })(InputManagement)