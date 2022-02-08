import React, { useEffect, useState } from 'react';
import Toggle from "react-switch"
export default function Switch(props) {
    const [checked, toggleChecked] = useState(false)
    useEffect(() => {
        props.toggleTheme(checked)
    }, [checked])
    return <div id="theme-toggle" className="mt-6 fixed top-0 left-1/2 sm:left-0 sm:relative">
        <Toggle offHandleColor={"#0a3f94"} onHandleColor={"#b50505"} checkedIcon={false} offColor={"#4287f5"} onColor={"#f54242"} onChange={() => toggleChecked(!checked)} checked={checked} uncheckedIcon={false}></Toggle>
    </div>;
}
