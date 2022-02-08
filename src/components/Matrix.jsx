import React, { useEffect, useRef, useState } from 'react';
import Letter from './Letter'
export default function Matrix(props) {
    const ref = useRef()
    ref.current = props.keys
    useEffect(() => {
        window.addEventListener('resize', resizeCanvas)
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');

        let w = canvas.width = document.body.offsetWidth;
        let h = canvas.height = document.body.offsetHeight;
        let cols = Math.floor(w / 20) + 1;
        let colArrays = Array(cols).fill(0);

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);

        function matrix() {
            let currentChar = ref.current.at(-1) ? ref.current.at(-1).string : null
            ctx.fillStyle = '#0001';
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#0f0';
            ctx.font = `${currentChar ? "bold" : ""} 15pt monospace`;
            
            colArrays.forEach((y, ind) => {
                let text = currentChar ? currentChar : String.fromCharCode(Math.random() * 128);
                if(ind % 2 == 0) text = String.fromCharCode(Math.random() * 128)
                const x = ind * 20;
                ctx.fillText(text, x, y);
                if (y > 100 + Math.random() * 10000) colArrays[ind] = 0;
                else colArrays[ind] = y + 20;
            });
        }
        function resizeCanvas(){
            w = canvas.width = document.body.offsetWidth;
            h = canvas.height = document.body.offsetHeight;
            cols = Math.floor(w / 20) + 1;
        colArrays = Array(cols).fill(0);
        }
        setInterval(matrix, 50);
        return () =>{
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])
    
    return <canvas id="matrix-canvas" className='absolute top-0 bottom-0 left-0 right-0 z-0'>
          {
          props.keys.map(keyContainer => {
            return (
              <Letter theme={localStorage.getItem("theme")} key={keyContainer.id} letter={keyContainer} />
            )
          })
        }
    </canvas>;
}
