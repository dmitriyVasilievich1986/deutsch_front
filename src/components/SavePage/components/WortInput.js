import { useSelector, useDispatch } from 'react-redux';
import { setState } from 'reduxReducers/mainReducer';
import className from 'classnames';
import Select from '../../Select';
import React from 'react';
import axios from 'axios';


function WortInput(props) {
    const loading = useSelector(state => state.main.loading);
    const group = useSelector(state => state.main.group);
    const wort = useSelector(state => state.main.wort);
    const dispatch = useDispatch();

    const [newDescription, setNewDescription] = React.useState("");
    const [newTranslate, setNewTranslate] = React.useState("");
    const [newGroup, setNewGroup] = React.useState(group[0]);
    const [newWort, setNewWort] = React.useState("");

    const saveHandler = _ => {
        if (loading) return

        dispatch(setState({ loading: true }));

        const data = {
            description: newDescription,
            translate: newTranslate,
            group: newGroup.id,
            wort: newWort,
        };

        setNewTranslate("");
        setNewWort("");

        axios.post(`/api/wort/`, data)
            .then(data => {
                const w = data.data;

                dispatch(setState({
                    message: { text: "Word is created successfuly" },
                    wort: [w, ...wort],
                    currentWort: w,
                    loading: false,
                }));
            })
            .catch(e => {
                dispatch(setState({
                    message: { text: "Word was not created", action: "error" },
                    loading: false,
                }));
                console.log(e);
            })
    }

    const eraserHandler = _ => {
        if (loading) return

        setNewGroup(group[0]);
        setNewDescription("");
        setNewTranslate("");
        setNewWort("");
    }


    return (
        <div style={{ border: "1px solid black", borderRadius: "10px", padding: "2rem", display: "flex", justifyContent: "center", maxWidth: "400px", flexFlow: "column" }}>
            <div style={{ margin: "0 0 2rem 0", textAlign: "center" }}>Create new word</div>
            <div style={{ width: "100%" }}>
                <div className={className("description_field")}>
                    <div>Word:</div>
                    <div><input disabled={loading} className={className("input")} placeholder="write the word" type="text" value={newWort} onChange={e => setNewWort(e.target.value)} /></div>
                </div>
                <div className={className("description_field")}>
                    <div>Translate:</div>
                    <div><input disabled={loading} className={className("input")} placeholder="write the translation" type="text" value={newTranslate} onChange={e => setNewTranslate(e.target.value)} /></div>
                </div>
                <div className={className("description_field")}>
                    <div>Group:</div>
                    <div>
                        <Select
                            changeHandler={newGroup => setNewGroup(newGroup)}
                            groupList={group}
                            value={newGroup}
                        />
                    </div>
                </div>
                Description:
                <textarea
                    onChange={e => setNewDescription(e.target.value)}
                    style={{ width: "100%", resize: "none", borderRadius: "5px", padding: "5px" }}
                    placeholder="empty description"
                    value={newDescription}
                    rows="6"
                />
                <div style={{ display: "flex", marginTop: "1rem" }}>
                    <img src="/static/i/eraser.png" onClick={eraserHandler} className={className("icon", { loading })} />
                    <img src="/static/i/save.png" onClick={saveHandler} className={className("icon", { loading })} />
                </div>
            </div>
        </div>
    )
}

export default WortInput