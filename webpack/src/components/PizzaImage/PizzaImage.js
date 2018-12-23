import React from 'react'
import classes from './PizzaImage.css';
import PIzzaImage from '../../assets/pizza.jpg';

const PizzaImage = (props) => {
  return (
    <div className={classes.PizzaImage}>
      <img src={PIzzaImage} className={classes.PizzaImg}/>                  
    </div>
  )
}

export default PizzaImage;
