import React from 'react';
import ErrorBoundry from '../error-boundry';
import ItemDetails, { Record } from '../item-details';
import SwapiService from '../../services/swapi-service';

const StarshipDetails = ({ itemId }) => {
  const swapi = new SwapiService();

  return (
    <ErrorBoundry>
      <ItemDetails
        itemId={itemId}
        getData={swapi.getStarship}
        getImageUrl={swapi.getStarshipImage}>
          
        <Record field='model' label='Model'/>
        <Record field='manufacturer' label='Manufacturer'/>
        <Record field='costInCredits' label='Cost in Credits'/>
        <Record field='length' label='Length'/>
        <Record field='crew' label='Crew'/>
        <Record field='passengers' label='Passengers'/>
        <Record field='cargoCapacity' label='Cargo capacity'/>
      </ItemDetails>
    </ErrorBoundry>
  );
}

export default StarshipDetails;