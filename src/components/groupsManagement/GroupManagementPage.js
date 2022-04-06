import { setState } from '../../reducers/mainReducer'
import InputManagement from './InputManagement'
import { connect } from 'react-redux'
import axios from 'axios'
import React from 'react'

function GroupManagementPage(props) {
    React.useEffect(_ => {
        props.setState({ loading: true })
        axios.get(`/api/${props.name}/`)
            .then(data => {
                const d = data.data
                props.setState({ loading: false, [props.name]: d })
            })
            .catch(e => {
                console.log(e)
                props.setState({ loading: false })
            })
    }, [])

    if (props.loading) return <h1>Loading...</h1>
    return (
        <div className='wort_page_wrapper'>
            <div className='s_container' />
            <div className='m_container mt2'>
                {props.Header}:
                {props[props.name].map(i => <InputManagement object={props.name} key={i.id} {...i} />)}
                <InputManagement object={props.name} id={0} name="" new />
            </div>
            <div className='s_container' />
        </div>
    )
}

const mapStateToProps = state => ({
    loading: state.main.loading,
    group: state.main.group,
    theme: state.main.theme,
})

export default connect(mapStateToProps, { setState })(GroupManagementPage)