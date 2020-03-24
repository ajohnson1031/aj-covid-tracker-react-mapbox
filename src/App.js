import React from "react";
import { connect } from "react-redux";
import MapboxGLMap from "./components/mapbox";
import { countCases } from "./redux-actions";

function App(state) {
  return (
    <div className='App'>
      <div className='map-container'>
        <pre id='title'>
          <p>World Corona Virus Map</p> <span className='divider'></span>
          <span className='nixwhite'>Total Confirmed Cases:</span>
          <p className='worldTotal'>
            {state.state.worldTotal !== 0 ? state.state.worldTotal : null}
          </p>
          <span className='nixwhite'>[Click A Circle To See Stats]</span>
        </pre>
        <MapboxGLMap id='map' state={state} />
      </div>
    </div>
  );
}
const mapStateToProps = state => ({ state: state });

export default connect(mapStateToProps, { countCases })(App);
