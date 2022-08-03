import { useSelector, useDispatch } from 'react-redux';
import { setState } from 'reduxReducers/mainReducer';
import Select from '../../Select';
import React from 'react';


function WortList() {
    const currentWort = useSelector(state => state.main.currentWort);
    const word = useSelector(state => state.main.word);
    const dispatch = useDispatch();

    return (
        <div style={{ margin: "2rem", width: "80%" }}>
            <Select
                value={{ name: `${currentWort.word} / ${currentWort.translate}`, ...currentWort }}
                groupList={word.map(w => ({ name: `${w.word} / ${w.translate}`, ...w }))}
                changeHandler={newWort => dispatch(setState({ currentWort: newWort }))}
            />
        </div>
    )
}

export default WortList