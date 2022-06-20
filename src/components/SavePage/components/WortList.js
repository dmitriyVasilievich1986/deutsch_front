import { useSelector, useDispatch } from 'react-redux';
import { setState } from 'reduxReducers/mainReducer';
import Select from '../../Select';
import React from 'react';


function WortList() {
    const currentWort = useSelector(state => state.main.currentWort);
    const wort = useSelector(state => state.main.wort);
    const dispatch = useDispatch();

    return (
        <div style={{ margin: "2rem", width: "80%" }}>
            <Select
                value={{ name: `${currentWort.wort} / ${currentWort.translate}`, ...currentWort }}
                groupList={wort.map(w => ({ name: `${w.wort} / ${w.translate}`, ...w }))}
                changeHandler={newWort => dispatch(setState({ currentWort: newWort }))}
            />
        </div>
    )
}

export default WortList