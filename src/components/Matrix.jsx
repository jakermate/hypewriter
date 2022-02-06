import React, { useEffect } from 'react';

export default function Matrix(props) {
    useEffect(() => {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');

        const w = canvas.width = document.body.offsetWidth;
        const h = canvas.height = document.body.offsetHeight;
        const cols = Math.floor(w / 20) + 1;
        const ypos = Array(cols).fill(0);

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);

        function matrix() {
            ctx.fillStyle = '#0001';
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#0f0';
            ctx.font = '15pt monospace';

            ypos.forEach((y, ind) => {
                const text = String.fromCharCode(Math.random() * 128);
                const x = ind * 20;
                ctx.fillText(text, x, y);
                if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
                else ypos[ind] = y + 20;
            });
        }

        setInterval(matrix, 50);
    }, [])
    return <canvas id="matrix-canvas" className='absolute top-0 bottom-0 left-0 right-0 z-0'></canvas>;
}
