import React from "react";
import { connect } from "react-redux";
import MapboxGLMap from "./components/mapbox";
import { countCases, highestRates, showHide } from "./redux-actions";

function App(state) {
  return (
    <div className='App'>
      <div className='map-container'>
        <div
          className='shbutton nixwhite'
          onClick={state.showHide}
          style={state.buttonInfo.styleA}
        >
          <span>{state.buttonInfo.text}</span>
        </div>

        <div id='sidebar-outer' style={state.buttonInfo.styleB}>
          <pre id='sidebar'>
            <div className='sidebar-inner-container'>
              <p>World Corona Virus Map</p> <span className='divider'></span>
              <span className='nixwhite'>Total Confirmed Cases:</span>
              <p className='worldTotal'>
                {state.worldTotal !== 0 ? state.worldTotal : null}
              </p>
              <span className='nixwhite'>[Click A Circle To See Stats]</span>
            </div>

            <div className='sidebar-inner-container light no-column'>
              <p className='stat'>
                Highest Death Count: <br />
                <span className='stat-entry'>
                  {state.highestDeathTotal.Province_State !== null
                    ? `${state.highestDeathTotal.Province_State}, `
                    : `${state.highestDeathTotal.Country_Region}, `}
                  <span className='red-text'>
                    {state.highestDeathTotal.DeathTotal !== 0
                      ? state.highestDeathTotal.DeathTotal
                      : null}
                  </span>
                </span>
              </p>

              <p className='stat'>
                Highest Death Rate: <br />
                <span className='stat-entry'>
                  {state.highestDeathRate.Province_State !== null
                    ? `${state.highestDeathRate.Province_State}, `
                    : `${state.highestDeathRate.Country_Region}, `}
                  <span className='red-text'>
                    {state.highestDeathRate.DeathRate !== 0
                      ? state.highestDeathRate.DeathRate
                      : null}
                  </span>
                </span>
              </p>

              <p className='stat'>
                Highest Recovery Count: <br />
                <span className='stat-entry'>
                  {state.highestRecoveredTotal.Province_State !== null
                    ? `${state.highestRecoveredTotal.Province_State}, `
                    : `${state.highestRecoveredTotal.Country_Region}, `}
                  <span className='green-text'>
                    {state.highestRecoveredTotal.RecoveryTotal !== 0
                      ? state.highestRecoveredTotal.RecoveryTotal
                      : null}
                  </span>
                </span>
              </p>

              <p className='stat'>
                Highest Recovery Rate: <br />
                <span className='stat-entry'>
                  {state.highestRecoveredRate.Province_State !== null
                    ? `${state.highestRecoveredRate.Province_State}, `
                    : `${state.highestRecoveredRate.Country_Region}, `}
                  <span className='green-text'>
                    {state.highestRecoveredRate.RecoveryRate !== 0
                      ? state.highestRecoveredRate.RecoveryRate
                      : null}
                  </span>
                </span>
              </p>
            </div>
          </pre>
        </div>
        <MapboxGLMap id='map' state={state} />
      </div>
    </div>
  );
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, { countCases, highestRates, showHide })(
  App
);
