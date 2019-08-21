import React from 'react';
import { getPosition } from './util';

const bounds = {
  min_lon: 113.8,
  min_lat: 22.1,
  max_lon: 114.5,
  max_lat: 22.6,
  width: 1000,
  height: 800,
};

export default function ATCDisplay ({ aircraft, myLocation }) {
    /** @type {React.MutableRefObject<HTMLCanvasElement>} */
    const ref = React.useRef();
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
                ctx.beginPath();
                ctx.moveTo(x + dx1, bounds.height - y - dy1);
                ctx.lineTo(x + dx, bounds.height - y - dy);
                ctx.stroke();
                ctx.fillText(craft.callsign, x + 10, bounds.height - y);
                ctx.fillText(`${metresToFlightLevel(craft.geo_altitude)} ${craft.vertical_rate > 2.5 ? "🡩" : craft.vertical_rate < -2.5 ? "🡫" : "=" }${mpsToKnotsDisplay(craft.velocity)}`, x + 10, bounds.height - y + 12);
                ctx.save();
                ctx.translate(x, bounds.height-y);
                ctx.rotate(θ);
                ctx.fillText("🛧️", -5, 4);
                ctx.restore();
            }
        }
    });

    return <canvas ref={ref} width={bounds.width} height={bounds.height} style={{ backgroundImage: `url(${require('./map_outline.png')})`, backgroundSize: "100%" }} />
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