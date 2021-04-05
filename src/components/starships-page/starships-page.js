import React from 'react';
import { withRouter } from 'react-router-dom';
import ErrorBoundry from '../error-boundry';
import ItemList from '../item-list';
import SwapiService from '../../services/swapi-service';

const StarshipsPage = ({ history }) => {
  const swapi = new SwapiService();

  return (
    <ErrorBoundry>
      <ItemList
        onItemSelected={(itemId) => history.push(itemId)}
        getData={swapi.getAllStarships}
        renderItem={(item) => `${item.name} (${item.model})`}/>
    </ErrorBoundry>
  );
}

export default withRouter(StarshipsPage);