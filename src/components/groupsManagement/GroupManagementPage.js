import { setState } from '../../reducers/mainReducer';
import InputManagement from './InputManagement';
import { connect } from 'react-redux';
import React from 'react';

function GroupManagementPage(props) {
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