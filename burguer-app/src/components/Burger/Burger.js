import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burguer = (props) => {
let transformedIngredients = Object.keys(props.ingredients)
  .map(igKey => {   
    return [...Array(props.ingredients[igKey])].map( (_, i) => {
      console.log(igKey + 1)
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  }).reduce( (prev, cur) => {
    return prev.concat(cur);
  }, []);

  console.log(transformedIngredients)
  if ( transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burguer;