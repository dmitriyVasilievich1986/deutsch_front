import { useSelector } from 'react-redux'
import className from 'classnames'
import React from 'react'

function Themes(props) {
    const [themeList, setThemeList] = React.useState([])
    const theme = useSelector(state => state.main.theme)

    React.useEffect(_ => {
        setThemeList(props?.themes || [])
    }, [props.themes])

    const filterList = (active, themeID) => {
        if (active) {
            setThemeList(themeList.filter(t => t != themeID))
        } else {
            setThemeList([themeID, ...themeList])
        }
        props?.clickHandler && props.clickHandler(active, themeID)
    }

    return (
        <div>
            <div style={{ margin: "1rem 2rem" }}>Themes:</div>
            <div className={className("theme_badge_list")}>
                {theme.filter(t => themeList.includes(t.id)).map(t => (
                    <div
                        onClick={_ => filterList(themeList.includes(t.id), t.id)}
                        className={className("theme_badge")}
                        key={t.id}
                    >
                        {t.name}
                    </div>
                ))}
            </div>
            <div className={className("splitter")}><div /></div>
            <div className={className("theme_badge_list")}>
                {theme.filter(t => !themeList.includes(t.id)).map(t => (
                    <div
                        onClick={_ => filterList(themeList.includes(t.id), t.id)}
                        className={className("theme_badge")}
                        key={t.id}
                    >
                        {t.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Themes