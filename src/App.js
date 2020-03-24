import React from "react";
import { connect } from "react-redux";
import MapboxGLMap from "./components/mapbox";

function App(state, props) {
  return (
    <div className='App'>
      <div className='map-container'>
        <pre id='title'>
          <p>World COVID-19 Map</p>
          <span className='nixwhite'>[Click A Circle To See Stats]</span>
        </pre>
        <MapboxGLMap id='map' state={state} />
      </div>
    </div>
  );
}
const mapStateToProps = state => ({ state: state });

export default connect(mapStateToProps)(App);
