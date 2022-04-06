import { useSelector, useDispatch } from 'react-redux'
import className from 'classnames'
import React from 'react'

function Themes(props) {
    const theme = useSelector(state => state.main.theme)
    const [themeList, setThemeList] = props.themeList

    const filterList = (active, themeID) => {
        if (active) {
            setThemeList(themeList.filter(t => t != themeID))
        } else {
            setThemeList([themeID, ...themeList])
        }
    }

    return (
        <div className='m2'>
            <p>Themes:</p>
            <div className='list_wrapper m2'>
                {theme.map(t => {
                    const active = themeList.includes(t.id)
                    return (
                        <div
                            className={className("wort", { active })}
                            onClick={_ => filterList(active, t.id)}
                            key={t.id}
                        >
                            {t.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Themes