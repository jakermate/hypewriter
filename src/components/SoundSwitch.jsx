import React, { useEffect, useState, useRef } from 'react';
import Toggle from "react-switch"
import soundOn from '../assets/volume.png'
import soundOff from '../assets/volume-mute.png'

export default function SoundSwitch(props) {
    const ref = useRef()
    useEffect(() => {
    }, [])
    return (
        <div className="fixed top-0 p-6">
            <Toggle ref={ref} className="shadow-lg" onColor="#888" offColor="#bbb" onChange={(e) => props.toggleSound(!props.soundEnabled, ref)} checked={props.soundEnabled} uncheckedHandleIcon={<div className="flex justify-center items-center h-full opacity-50"><img className="w-3" src={soundOff} alt="" /></div>} checkedHandleIcon={<div className="flex justify-center items-center h-full"><img className="w-3" src={soundOn} alt="" /></div>} uncheckedIcon={false} checkedIcon={false}>

            </Toggle>
        </div>
    )
}
