# World Coronavirus Map Frontend

This map tracks the latest infection counts and rates as supplied by the ArcGIS database. It also provides death counts and rates per selected state or country as well as real-time tweets from individuals in the affected areas that are accessed via Twitter's Statuses API.

## Motivation

With misinformation surrounding the current pandemic at an all-time high, I wanted to be able to receive the most accurate information possible as supplied by reliable sources. The purpose of this app is the dissemination of truthful coronavirus reports by comparing statistical data with independently supplied information from on-the ground observations made by real people via Tweets.

## Build Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/f35f8c80-71be-4ade-98b8-eee8563503dd/deploy-status)](https://app.netlify.com/sites/aj-coronavirus-tracker-tool/deploys)

### Code Style

<img src="https://img.shields.io/badge/react%20component%20style-functional%20w%2Fhooks-brightgreen" alt="react component style - functional with hooks">

## Screenshots

<img src="https://raw.githubusercontent.com/ajohnson1031/aj-covid-tracker-react-mapbox/master/src/imgs/screenshot.jpg" alt="world coronavirus map screenshot" style="border: 1px solid #ccc; padding: 10px;">

## Tech/Framework Used

- Front End: React.js
- State Management: Redux.js
- Data Retrieval: ArcGIS API
- Selective User Tweets: Twitter Statuses API
- Data Map Visualizations: Mapbox.js API
- Donation Capability: Coinbase Commerce API

## Site Build & Backend Deployment

Current continuous build is managed by <a href="https://aj-coronavirus-tracker-tool.netlify.app/" target="_blank"><strong>Netlify</strong></a> and maintained using Netlify CLI. <a href="https://github.com/ajohnson1031/ajohnson1031-aj-covid-tracker-react-mapbox-be" target="_blank"><strong>Backend</strong></a> and environment variables are configured on a <strong>Heroku</strong> server instance.

## Features

Users are able to toggle between infection/recovery data and visualizations via a switch supplied in the custom dashboard. Users may also choose to hide the dashboard to view the map unobstructed. Tweets are pulled from a preset area centered around the selected area and update with each click. Clicked hotspots bring up a modal displaying the selected area's statistics.

## Installation

Fork and clone this repository and run `yarn` to install required dependencies. You will also need to fork and clone the <a href="https://github.com/ajohnson1031/ajohnson1031-aj-covid-tracker-react-mapbox-be" target="_blank"><strong>Backend</strong></a> repo and host it at your preferred provider. Heroku is recommended for ease of implementation.

There are several APIs you will need to create KEYS for.

- <a href="https://docs.mapbox.com/mapbox.js/api/v3.3.1/" target="_blank" style="font-weight: bold; color: orange !important;">Mapbox.js API</a> for map drawing.
- <a href="https://coronavirus-disasterresponse.hub.arcgis.com/" target="_blank" style="font-weight: bold; color: orange !important;">ArcGIS</a> for coronavirus data.
- <a href="https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets" target="_blank" style="font-weight: bold; color: orange !important;">Twitter Search</a> for realtime tweets.
- (Optional) - <a href="https://commerce.coinbase.com/docs/api/" target="_blank" style="font-weight: bold; color: orange !important;">Coinbase Commerce</a> for accepting donations.

The frontend may be hosted on any desired service, however Netlify is by this author preferred.

## Contribute

A feature which may augment the usefulness of the app is a country selector. As of this current iteration, cumulative data from the United States has not been included.
