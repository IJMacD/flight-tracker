import React from 'react';
import { getPosition } from './util';

export default function ATCDisplay ({ bounds, aircraft, history, myLocation, coastline }) {
    /** @type {React.MutableRefObject<HTMLCanvasElement>} */
    const ref = React.useRef();
    /** @type {React.MutableRefObject<HTMLCanvasElement>} */
    const bgRef = React.useRef();

    React.useEffect(() => {
        if (ref.current) {
            const ctx = ref.current.getContext("2d");
            ctx.clearRect(0, 0, bounds.width, bounds.height);

            if (myLocation) {
                const { x, y } = getPosition(bounds, myLocation.longitude, myLocation.latitude);
                ctx.fillStyle = "#F00";
                ctx.beginPath();
                ctx.arc(x, bounds.height - y, 1, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.strokeStyle = "#C0F0C0";
            ctx.fillStyle = "#F0F0C0";

            for (const craft of aircraft) {
                const { x, y } = getPosition(bounds, craft.longitude, craft.latitude);
                const θ = toRadians(craft.true_track);

                const dx1 = Math.sin(θ) * 5;
                const dy1 = Math.cos(θ) * 5;
                const dx = Math.sin(θ) * craft.velocity * 0.1;
                const dy = Math.cos(θ) * craft.velocity * 0.1;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x + dx1, bounds.height - y - dy1);
                ctx.lineTo(x + dx, bounds.height - y - dy);
                ctx.stroke();

                const hist = history[craft.icao24];
                if (hist) {
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    let first = true;
                    for (const h of hist) {
                        const { x, y } = getPosition(bounds, h.longitude, h.latitude);
                        first ? ctx.moveTo(x,bounds.height-y) : ctx.lineTo(x,bounds.height-y);
                        first = false;
                    }
                    ctx.stroke();
                }

                ctx.fillText(craft.callsign, x + 10, bounds.height - y);
                ctx.fillText(`${metresToFlightLevel(craft.geo_altitude)}${craft.vertical_rate > 2.5 ? "🡩" : craft.vertical_rate < -2.5 ? "🡫" : "=" } ${mpsToKnotsDisplay(craft.velocity)}`, x + 10, bounds.height - y + 12);
                ctx.save();
                ctx.translate(x, bounds.height-y);
                ctx.rotate(θ);
                ctx.fillText("🛧️", -5, 4);
                ctx.restore();
            }
        }
    });

    React.useEffect(() => {
        if (bgRef.current && coastline) {
            const ctx = bgRef.current.getContext("2d");
            ctx.strokeStyle = "#80C080";
            for (const f of coastline.features) {
                ctx.beginPath();
                let first = true;
                for (const coord of f.geometry.coordinates) {
                    const { x, y } = getPosition(bounds, coord[0], coord[1]);
                    first ? ctx.moveTo(x, bounds.height - y) : ctx.lineTo(x, bounds.height - y);
                    first = false;
                }
                ctx.stroke();
            }
        }
    }, [coastline]);

    return <div style={{ position: "relative" }}>
        <canvas ref={bgRef} width={bounds.width} height={bounds.height} style={{ position: "absolute" }} />
        <canvas ref={ref} width={bounds.width} height={bounds.height} />
    </div>
}

function metresToFlightLevel (metres) {
    return String((metres * 0.0328084)|0).padStart(3, "0");
}

function mpsToKnotsDisplay (mps) {
    return (mps * 0.194384)|0;
}

function toRadians (deg) {
    return deg * Math.PI / 180;
}