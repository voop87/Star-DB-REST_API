import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './item-list.css';

const ItemListView = ({itemList, onItemSelected, renderItem}) => {
  const elements = itemList.map((item) => {
    const label = renderItem(item);

    return (
      <li 
        className='list-group-item'
        key={item.id}
        onClick={() => {onItemSelected(item.id)}}>
        {label}
      </li>
    );
  });
  
  return (
    <ul className='item-list list-group'>
      {elements}
    </ul>
  );
};

class ItemList extends Component {
  render() {
    const { data, loading, error, onItemSelected, renderItem } = this.props;
    const hasData = !(loading || error);

    const errorIndicator = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ItemListView 
                                itemList={data} 
                                onItemSelected={onItemSelected}
                                renderItem={renderItem}/> : null;

    return (
      <React.Fragment>
        {errorIndicator}
        {spinner}
        {content}
      </React.Fragment>
    );
  };
}

const withData = () => {
  return class extends Component {
    state = {
      data: null,
      loading: true,
      error: false
    };
  
    onItemListLoaded = (data) => {
      this.setState({
        data,
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
  
    componentDidMount() {
      const { getData } = this.props;
      getData()
        .then(this.onItemListLoaded)
        .catch(this.onError);
    };
    
    render() {
      const { data, loading, error } = this.state;

      return (
        <ItemList {... this.props} data={data} loading={loading} error={error}/>
      );
    };
  };
};

export default withData();