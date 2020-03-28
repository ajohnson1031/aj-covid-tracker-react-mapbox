import React, { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";
import MapboxGLMap from "./components/mapbox";
import NewsFeed from "./components/newsfeed";

import {
  countCases,
  highestRates,
  showHide,
  getMapKey,
  getNewsKey,
  getCoinBaseID,
  changeMapView,
  locationClicked,
  addComma
} from "./redux-actions";

function App(state) {
  useEffect(() => {
    state.getMapKey();
    state.getNewsKey();
    state.getCoinBaseID();
  }, []);
  return (
    <div className='App'>
      <div className='map-container'>
        <div className='shbutton nixwhite' style={state.buttonInfo.styleA}>
          <span onClick={state.showHide}>{state.buttonInfo.text}</span>
          <span id='toggle-id' className={state.mapview}>
            {state.mapview.charAt(0).toUpperCase() + state.mapview.slice(1)}
          </span>
          {state.cbkey && (
            <>
              <a
                className='cb_button'
                href={`https://commerce.coinbase.com/checkout/${state.cbkey}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Icon name='coffee' />
                &nbsp;Kuppa Joe?
              </a>
              <script src='https://commerce.coinbase.com/v1/checkout.js?version=201807'></script>
            </>
          )}
        </div>

        <div id='sidebar-outer' style={state.buttonInfo.styleB}>
          <pre id='sidebar'>
            <div className='sidebar-inner-container'>
              <p className='page-title'>World Corona Virus Map</p>{" "}
              <span className='divider'></span>
              <span className='nixwhite'>{`Total ${state.mapview
                .charAt(0)
                .toUpperCase() + state.mapview.slice(1)} Cases:`}</span>
              <p className={`worldTotal ${state.colorkey}`}>
                {state.mapview === "confirmed" && state.worldTotal !== 0
                  ? addComma(state.worldTotal)
                  : null}
                {state.mapview === "recovered" && state.worldTotal !== 0
                  ? addComma(state.worldRecovered)
                  : null}
              </p>
              <span className='nixwhite'>[Click A Circle To See Stats]</span>
            </div>

            <div className='sidebar-inner-container light no-column'>
              <p id='hdc' className='stat'>
                Highest Fatality Count: <br />
                <span className='stat-entry'>
                  {state.highestDeathTotal.Province_State !== null
                    ? `${state.highestDeathTotal.Province_State}, `
                    : `${state.highestDeathTotal.Country_Region}, `}
                  <span className='red-text'>
                    {state.highestDeathTotal.DeathTotal !== 0
                      ? addComma(state.highestDeathTotal.DeathTotal)
                      : null}
                  </span>
                </span>
                <input
                  id='hdci'
                  type='hidden'
                  value={[
                    state.highestDeathTotal.Lat,
                    state.highestDeathTotal.Long,
                    state.highestDeathTotal.Province_State,
                    state.highestDeathTotal.Country_Region,
                    state.highestDeathTotal.Confirmed,
                    state.highestDeathTotal.Deaths,
                    state.highestDeathTotal.Recovered,
                    state.mapview
                  ]}
                />
              </p>

              <p id='hdr' className='stat'>
                Highest Fatality Rate: <br />
                <span className='stat-entry'>
                  {state.highestDeathRate.Province_State !== null
                    ? `${state.highestDeathRate.Province_State}, `
                    : `${state.highestDeathRate.Country_Region}, `}
                  <span className='red-text'>
                    {state.highestDeathRate.DeathRate !== 0
                      ? state.highestDeathRate.DeathRate + "%"
                      : null}
                  </span>
                </span>
                <input
                  id='hdri'
                  type='hidden'
                  value={[
                    state.highestDeathRate.Lat,
                    state.highestDeathRate.Long,
                    state.highestDeathRate.Province_State,
                    state.highestDeathRate.Country_Region,
                    state.highestDeathRate.Confirmed,
                    state.highestDeathRate.Deaths,
                    state.highestDeathRate.Recovered,
                    state.mapview
                  ]}
                />
              </p>

              <p id='hrc' className='stat no-margin'>
                Highest Recov. Count: <br />
                <span className='stat-entry'>
                  {state.highestRecoveredTotal.Province_State !== null
                    ? `${state.highestRecoveredTotal.Province_State}, `
                    : `${state.highestRecoveredTotal.Country_Region}, `}
                  <span className='green-text'>
                    {state.highestRecoveredTotal.RecoveryTotal !== 0
                      ? addComma(state.highestRecoveredTotal.RecoveryTotal)
                      : null}
                  </span>
                </span>
                <input
                  id='hrci'
                  type='hidden'
                  value={[
                    state.highestRecoveredTotal.Lat,
                    state.highestRecoveredTotal.Long,
                    state.highestRecoveredTotal.Province_State,
                    state.highestRecoveredTotal.Country_Region,
                    state.highestRecoveredTotal.Confirmed,
                    state.highestRecoveredTotal.Deaths,
                    state.highestRecoveredTotal.Recovered,
                    state.mapview
                  ]}
                />
              </p>

              <p id='hrr' className='stat no-margin'>
                Highest Recov. Rate: <br />
                <span className='stat-entry'>
                  {state.highestRecoveredRate.Province_State !== null
                    ? `${state.highestRecoveredRate.Province_State}, `
                    : `${state.highestRecoveredRate.Country_Region}, `}
                  <span className='green-text'>
                    {state.highestRecoveredRate.RecoveryRate !== 0
                      ? state.highestRecoveredRate.RecoveryRate + "%"
                      : null}
                  </span>
                </span>
                <input
                  id='hrri'
                  type='hidden'
                  value={[
                    state.highestRecoveredRate.Lat,
                    state.highestRecoveredRate.Long,
                    state.highestRecoveredRate.Province_State,
                    state.highestRecoveredRate.Country_Region,
                    state.highestRecoveredRate.Confirmed,
                    state.highestRecoveredRate.Deaths,
                    state.highestRecoveredRate.Recovered,
                    state.mapview
                  ]}
                />
              </p>
            </div>

            {state.location && (
              <div className='news-inner-container'>
                <span className='nixwhite stories'>
                  <strong>Related News Stories from {state.location}</strong>:
                  <br />
                  <a
                    className='attribution'
                    href='https://newsapi.org/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    powered by NewsAPI.org
                  </a>
                </span>
                <div className='article-container light'>
                  <NewsFeed state={state} />
                </div>
              </div>
            )}
          </pre>
        </div>
        {state.mkey && <MapboxGLMap id='map' state={state} />}
      </div>
    </div>
  );
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  countCases,
  highestRates,
  showHide,
  getMapKey,
  getNewsKey,
  getCoinBaseID,
  changeMapView,
  locationClicked,
  addComma
})(App);
