import { useSelector } from 'react-redux';
import className from 'classnames';
import React from 'react';

function DeleteButton(props) {
    const loading = useSelector(state => state.main.loading)
    const [animation, setAnimation] = React.useState(false)
    let timer = React.useRef(null)

    const downHandler = e => {
        if (loading) return
        setAnimation(true)
        timer.current = setTimeout(_ => {
            setAnimation(false)
            props.deleteHandler()
            timer.current = null
        }, 2400)
    }

    const upHandler = _ => {
        if (timer.current) {
            clearTimeout(timer.current)
            setAnimation(false)
        }
    }

    return (
        <div className={className("test_class", { animation })}>
            <img
                className={className("icon", "mt2", { loading })}
                onMouseDown={downHandler}
                src="/static/i/bin.png"
                onMouseUp={upHandler}
            />
        </div>
    )
}

export default DeleteButton