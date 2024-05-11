import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../item/Item';

export const Popular = () => {
  const [popular_Products, setPopular_Products] = useState([]);

  useEffect(() => {
    fetch('https://jydagjysdvagkuasdu.onrender.com/popularinwomen')
      .then((response) => response.json())
      .then((data) => setPopular_Products(data));
    console.log('popular fetched');
  }, []);

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className='popular-item'>
        {console.log(popular_Products)}
        {popular_Products.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};
