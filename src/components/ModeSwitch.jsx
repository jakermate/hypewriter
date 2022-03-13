import React, { useEffect, useState, useRef } from 'react';
import Toggle from "react-switch"
export default function Switch(props) {
    const [checked, toggleChecked] = useState(false)
    const [width, setWidth] = useState(0)

    const ref = useRef()

    useEffect(() => {
        setWidth(ref.current.offsetWidth)
    }, [])
    useEffect(() => {
        props.toggleTheme(checked)
    }, [checked])
    return <div ref={ref} id="theme-toggle" className="mt-6 fixed top-0 left-1/2 sm:left-0 sm:relative" style={{
        left: `calc(50% - ${width / 2}px)`
    }}>
        <Toggle tabIndex={-1} className="shadow-xl" offHandleColor={"#0a3f94"} onHandleColor={"#b50505"} checkedIcon={false} offColor={"#4287f5"} onColor={"#f54242"} onChange={() => toggleChecked(!checked)} checked={checked} uncheckedIcon={false}></Toggle>
    </div>;
}
