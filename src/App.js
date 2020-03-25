import React from "react";
import { connect } from "react-redux";
import MapboxGLMap from "./components/mapbox";
import { countCases, highestRates } from "./redux-actions";

function App(state) {
  return (
    <div className='App'>
      <div className='map-container'>
        <pre id='sidebar'>
          <div className='sidebar-inner-container'>
            <p>World Corona Virus Map</p> <span className='divider'></span>
            <span className='nixwhite'>Total Confirmed Cases:</span>
            <p className='worldTotal'>
              {state.state.worldTotal !== 0 ? state.state.worldTotal : null}
            </p>
            <span className='nixwhite'>[Click A Circle To See Stats]</span>
          </div>

          <div className='sidebar-inner-container light no-column'>
            <p className='stat'>
              Highest Death Count: <br />
              <span className='stat-entry'>
                {state.state.highestDeathTotal.Province_State !== null
                  ? `${state.state.highestDeathTotal.Province_State}, `
                  : `${state.state.highestDeathTotal.Country_Region}, `}
                <span className='red-text'>
                  {state.state.highestDeathTotal.DeathTotal !== 0
                    ? state.state.highestDeathTotal.DeathTotal
                    : null}
                </span>
              </span>
            </p>

            <p className='stat'>
              Highest Death Rate: <br />
              <span className='stat-entry'>
                {state.state.highestDeathRate.Province_State !== null
                  ? `${state.state.highestDeathRate.Province_State}, `
                  : `${state.state.highestDeathRate.Country_Region}, `}
                <span className='red-text'>
                  {state.state.highestDeathRate.DeathRate !== 0
                    ? state.state.highestDeathRate.DeathRate
                    : null}
                </span>
              </span>
            </p>

            <p className='stat'>
              Highest Recovery Count: <br />
              <span className='stat-entry'>
                {state.state.highestRecoveredTotal.Province_State !== null
                  ? `${state.state.highestRecoveredTotal.Province_State}, `
                  : `${state.state.highestRecoveredTotal.Country_Region}, `}
                <span className='green-text'>
                  {state.state.highestRecoveredTotal.RecoveryTotal !== 0
                    ? state.state.highestRecoveredTotal.RecoveryTotal
                    : null}
                </span>
              </span>
            </p>

            <p className='stat'>
              Highest Recovery Rate: <br />
              <span className='stat-entry'>
                {state.state.highestRecoveredRate.Province_State !== null
                  ? `${state.state.highestRecoveredRate.Province_State}, `
                  : `${state.state.highestRecoveredRate.Country_Region}, `}
                <span className='green-text'>
                  {state.state.highestRecoveredRate.RecoveryRate !== 0
                    ? state.state.highestRecoveredRate.RecoveryRate
                    : null}
                </span>
              </span>
            </p>
          </div>
        </pre>
        <MapboxGLMap id='map' state={state} />
      </div>
    </div>
  );
}
const mapStateToProps = state => ({ state: state });

export default connect(mapStateToProps, { countCases, highestRates })(App);
