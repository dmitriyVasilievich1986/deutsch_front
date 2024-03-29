import { useSelector, useDispatch } from 'react-redux';
import { setState } from 'reduxReducers/mainReducer';
import DeleteButton from '../../DeleteButton';
import className from 'classnames';
import Select from '../../Select';
import axios from 'axios';
import React from 'react';


function WortDescription() {
    const currentWort = useSelector(state => state.main.currentWort);
    const wortTheme = useSelector(state => state.main.wortTheme);
    const loading = useSelector(state => state.main.loading);
    const group = useSelector(state => state.main.group);
    const word = useSelector(state => state.main.word);
    const dispatch = useDispatch();

    const [newDescription, setNewDescription] = React.useState("");
    const [deutschWort, setDeutschWort] = React.useState("");
    const [translate, setTranslate] = React.useState("");
    const [groupID, setGroupID] = React.useState(0);

    React.useEffect(_ => {
        eraserHandler();
    }, [currentWort])

    const saveWort = _ => {
        if (currentWort.id == 0 || loading) return

        dispatch(setState({ loading: true }));

        const newWort = {
            description: newDescription,
            translate: translate,
            word: deutschWort,
            group: groupID,
        };

        axios.patch(`/api/word/${currentWort.id}/`, newWort)
            .then(data => {
                const d = data.data;
                const wl = word.map(w => w.id == d.id ? d : w);

                dispatch(setState({
                    message: { text: `Word is changed successfuly` },
                    currentWort: d,
                    loading: false,
                    word: wl,
                }));
            })
            .catch(e => {
                dispatch(setState({
                    message: { text: "Word was not changed", action: "error" },
                    loading: false,
                }));
                console.log(e);
            })
    }

    const eraserHandler = _ => {
        if (loading) return

        const g = currentWort.group == 0 && group.length > 0 ? group[0].id : currentWort.group;
        setNewDescription(currentWort.description || "");
        setTranslate(currentWort.translate);
        setDeutschWort(currentWort.word);
        setGroupID(g);
    }

    const deleteHandler = _ => {
        if (loading) return

        const currentID = currentWort.id;
        dispatch(setState({ loading: true }));

        axios.delete(`/api/word/${currentID}/`)
            .then(_ => {
                const newWort = word.filter(w => w.id != currentID);

                dispatch(setState({
                    message: { text: `Word was deleted successfuly` },
                    wortTheme: wortTheme.filter(wt => wt.word != currentID),
                    currentWort: newWort[0],
                    loading: false,
                    word: newWort,
                }));
            })
            .catch(e => {
                dispatch(setState({
                    message: { text: "Word was not deleted", action: "error" },
                    loading: false,
                }));
                console.log(e);
            })
    }

    if (currentWort.id == 0) return null
    return (
        <div className={className("m2")}>
            <div style={{ maxWidth: "400px" }}>
                <div className={className("description_field")}>
                    <div>ID:</div>
                    <div><input className={className("input")} type="text" value={currentWort.id} disabled /></div>
                </div>
                <div className={className("description_field")}>
                    <div>Word:</div>
                    <div><input className={className("input")} type="text" value={deutschWort} onChange={e => setDeutschWort(e.target.value)} /></div>
                </div>
                <div className={className("description_field")}>
                    <div>Translate:</div>
                    <div><input className={className("input")} type="text" value={translate} onChange={e => setTranslate(e.target.value)} /></div>
                </div>
                <div className={className("description_field")}>
                    <div>Group:</div>
                    <Select
                        value={group.find(g => g.name == currentWort.group)}
                        changeHandler={newGroup => setGroupID(newGroup.id)}
                        groupList={group}
                    />
                </div>
                Description:
                <textarea
                    onChange={e => setNewDescription(e.target.value)}
                    style={{ width: "100%", resize: "none", borderRadius: "5px", padding: "5px" }}
                    placeholder='empty description'
                    value={newDescription}
                    rows="6"
                />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src="/static/i/eraser.png" onClick={eraserHandler} className={className("icon", "mt2", { loading })} />
                <img src="/static/i/save.png" onClick={_ => saveWort()} className={className("icon", "mt2", { loading })} />
                <DeleteButton deleteHandler={deleteHandler} />
            </div>
        </div>
    )
}

export default WortDescription