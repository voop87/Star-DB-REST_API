import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';

import './random-planet.css';

const PlanetView = ({planet}) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className='random-planet__img' width='100' height='100' alt='Planet'
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
      <div className='random-planet__info'>
        <h2 className='random-planet__title'>{ name }</h2>
        <ul className='random-planet__desc-list'>
          <li className='random-planet__desc-item'>
            <span className='random-planet__desc-text'>Population</span>
            <span className='random-planet__desc-value'>{ population }</span>
          </li>
          <li className='random-planet__desc-item'>
            <span className='random-planet__desc-text'>Rotation Period</span>
            <span className='random-planet__desc-value'>{ rotationPeriod }</span>
          </li>
          <li className='random-planet__desc-item'>
            <span className='random-planet__desc-text'>Diameter</span>
            <span className='random-planet__desc-value'>{ diameter }</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default class RandomPlanet extends Component {
  swapi = new SwapiService();

  state = {
    planet: {},
    loading: true
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 5000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random()*18) + 2;
    this.swapi
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {
    const { planet, loading, error } = this.state;
    const hasData = !(loading || error);

    const errorIndicator = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <section className='random-planet d-flex'>
        {errorIndicator}
        {spinner}
        {content}
      </section>
    );
  };
};