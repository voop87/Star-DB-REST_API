import React, { Component } from 'react';
import ErrorBoundry from '../error-boundry';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import SwapiService from '../../services/swapi-service';

export default class PlanetsPage extends Component {
  swapi = new SwapiService();

  state = {
    selectedPlanet: null
  };

  onPlanetSelected = (id) => {
    this.setState({
      selectedPlanet: id
    });
  };

  render() {
    return (
      <ErrorBoundry>
        <div className='row mb2'>
          <div className='col-md-6'>
            <ItemList
              onItemSelected={this.onPlanetSelected}
              getData={this.swapi.getAllPlanets}
              renderItem={(item) => `${item.name} (${item.population})`}/>
          </div>
          <div className='col-md-6'>
            <ItemDetails
              itemId={this.state.selectedPlanet}
              getData={this.swapi.getPlanet}
              getImageUrl={this.swapi.getPlanetImage}>
                
              <Record field='population' label='Population'/>
              <Record field='rotationPeriod' label='Rotation period'/>
              <Record field='diameter' label='Diameter'/>
            </ItemDetails>
          </div>
        </div>
      </ErrorBoundry>
    );
  };
}
