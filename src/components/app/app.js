//Использую HashRouter вместо BrowserRouter в учебных целях, 
//для корректной работы в build-версии
import { HashRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import ErrorBoundry from '../error-boundry';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import PlanetsPage from '../planets-page';
import StarshipsPage from '../starships-page';
import StarshipDetails from '../starship-details';

import './app.css';

export default class App extends Component {

  render() {
    return (
      <ErrorBoundry>
        <Router>
          <div className='container'>
            <Header />
            <RandomPlanet />
            <Route path='/'
                   exact
                   render={() => <h2>Welcome to StarDB</h2>} />

            {/* сохраняем URL выбранного персонажа */}
            <Route path='/people/:id?' component={PeoplePage} />
            {/* оставляем без изменения (для сравнения) */}
            <Route path='/planets' component={PlanetsPage} />
            <Route path='/starships' exact component={StarshipsPage} />
            {/* переходим на URL выбранного корабля */}
            <Route path='/starships/:id' 
                   render={({ match }) => {
                     const { id } = match.params;
                     return <StarshipDetails itemId={id} />
                   }} />
          </div>
        </Router>
      </ErrorBoundry>
    );
  }
};