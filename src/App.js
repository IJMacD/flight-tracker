import React from 'react';
import './App.css';
import ATCDisplay from './ATCDisplay';
import { getPosition } from './util';

const map_bounds = {
  min_lon: 113.5,
  min_lat: 22.0,
  max_lon: 114.5,
  max_lat: 22.7,
  width: 1083,
  height: 842,
};

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      aircraft: [],
      history: {},
    };
  }

  async componentDidMount () {
    const update = async () => {
      const aircraft = await getAircraft(map_bounds);
      const history = updateHistory(this.state.history, aircraft);
      this.setState({ aircraft, history });
    }
    update();
    this.timeout = setInterval(update, 10 * 1000);

    navigator.geolocation.getCurrentPosition(p => {
      this.setState({ myLocation: p.coords });
    });

    const coastline = (await import("./coastline.json")).default;
    this.setState({ coastline });
  }

  componentWillUnmount () {
    clearInterval(this.timeout);
  }

  render () {
    return (
      <div className="App">
        {/* <div style={{ width: map_bounds.width, height: map_bounds.height, backgroundImage: `url(${require('./map.png')})`, position: "relative", margin: "0 auto" }}>
          { this.state.aircraft.map(a => {
            const { x: left, y: bottom } = getPosition(map_bounds, a.longitude, a.latitude);
            return <div key={a.icao24} style={{ position: "absolute", left, bottom, transform: `rotate(${a.true_track}deg)` }}>🛧️</div>
          })}
        </div>
        <div style={{ width: map_bounds.width, height: 200, position: "relative", borderBottom: "1px solid #CCC", margin: "0 auto" }}>
          { this.state.aircraft.map(a => {
            const { x: left } = getPosition(map_bounds, a.longitude, a.latitude);
            const bottom = (a.geo_altitude || a.baro_altitude) / 50;
            return <div key={a.icao24} style={{ position: "absolute", left, bottom, transform: a.true_track > 180 ? `scale(-1,1)` : "" }}>
              {a.vertical_rate > 2.5 ? "🛫︎" : a.vertical_rate < -2.5 ? "🛬︎" : "✈︎" }
            </div>
          })}
        </div> */}
        <ATCDisplay
          aircraft={this.state.aircraft}
          history={this.state.history}
          myLocation={this.state.myLocation}
          coastline={this.state.coastline}
          bounds={map_bounds}
        />
      </div>
    );
  }
}

export default App;

async function getAircraft (bounds) {
  const r = await fetch(`https://opensky-network.org/api/states/all?lamin=${bounds.min_lat}&lomin=${bounds.min_lon}&lamax=${bounds.max_lat}&lomax=${bounds.max_lon}`);
  const d = await r.json();
  const headers = ["icao24", "callsign", "origin_country", "time_position", "last_contact", "longitude", "latitude", "baro_altitude", "on_ground", "velocity", "true_track", "vertical_rate", "sensors", "geo_altitude", "squawk", "spi", "position_source"];
  return d.states.map(s => zip(headers, s));
}

function zip (keys, values) {
  const o = {};
  for (let i = 0; i < keys.length && i < values.length; i++) {
    o[keys[i]] = values[i];
  }
  return o;
}

function updateHistory (history, aircraft) {
  const out = {};

  for (const craft of aircraft) {
    const prev = history[craft.icao24] || [];
    const { longitude, latitude } = craft;
    out[craft.icao24] = [ ...prev, { longitude, latitude } ];
  }

  return out;
}