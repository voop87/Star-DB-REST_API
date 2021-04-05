import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className='item-card__desc-item'>
      <span className='item-card__desc-text'>{ label }</span>
      <span className='item-card__desc-value'>{ item[field] }</span>
    </li>
  );
};
export { Record };

export default class ItemDetails extends Component {

  swapi = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: true
  };

  componentDidMount() {
    this.updateItem();
  };

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  };

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({ 
          item,
          image: getImageUrl(item),
          loading: false
        });
      });
  };

  render() {
    if (!this.state.item) {
      return (
        <span>Select an item from a list</span>
      );
    }

    const { name } = this.state.item;
    const { item, image, loading } = this.state;
    const spinner = loading ? <Spinner /> : null;

    return (
      <React.Fragment>
        { spinner }
        <div className='item-card d-flex'>
          <img className='item-card__img' src={ image } width='100' height='100' alt='Item'/>
          <div className='item-card__info'>
            <h2 className='item-card__title'>{ name }</h2>
            <ul className='item-card__desc-list'>
              {
                React.Children.map(this.props.children, (child) => {
                  return React.cloneElement(child, { item });
                })
              }
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  };
};