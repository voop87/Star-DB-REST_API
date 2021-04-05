import React from 'react';
import { withRouter } from 'react-router-dom';
import ErrorBoundry from '../error-boundry';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import SwapiService from '../../services/swapi-service';

const PeoplePage = ({ history, match }) => {
  const swapi = new SwapiService();
  const { id } = match.params;

  return (
    <ErrorBoundry>
      <div className='row mb2'>
        <div className='col-md-6'>
          <ItemList
            onItemSelected={(id) => history.push(id)}
            getData={swapi.getAllPeople}
            renderItem={(item) => `${item.name} (${item.gender}, ${item.birthYear})`}/>
        </div>
        <div className='col-md-6'>
          <ItemDetails
            itemId={id}
            getData={swapi.getPerson}
            getImageUrl={swapi.getPersonImage}>
              
            <Record field='gender' label='Gender'/>
            <Record field='eyeColor' label='Eye color'/>
          </ItemDetails>
        </div>
      </div>
    </ErrorBoundry>
  );
}

export default withRouter(PeoplePage);