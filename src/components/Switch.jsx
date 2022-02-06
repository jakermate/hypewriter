import React, { useEffect, useState } from 'react';
import Toggle from "react-switch"
export default function Switch(props) {
    const [checked, toggleChecked] = useState(false)
    useEffect(()=>{
        props.toggleTheme(checked)
    }, [checked])
    return <div id="theme-toggle" className="mt-6">
        <Toggle offHandleColor={"#fff"} onHandleColor={"#fff"} checkedIcon={false} offColor={"#000"} onColor={"#00ff41"} onChange={() => toggleChecked(!checked)} checked={checked} uncheckedIcon={false}></Toggle>
    </div>;
}
