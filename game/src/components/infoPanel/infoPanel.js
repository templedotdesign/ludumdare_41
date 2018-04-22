//Core
import React from 'react'

//CSS
import classes from './infoPanel.css'

const infoPanel = (props) => {
  return (
    <div className={classes.infoPanel}>
      <h1 className={classes.heading}>Supplies</h1>
      <p className={classes.pop}>Population: {props.info.idlePop}/{props.info.pop}</p>
      <div className={classes.left}>
        <p>Food: {props.info.food}</p>
        <p>Wood: {props.info.wood}</p>
        <p>Stone: {props.info.stone}</p>
        <p>Iron: {props.info.iron}</p>
      </div>
      <div className={classes.right}>
        <p>Happiness: {props.info.happiness}</p>
        <p>Luxuries: {props.info.luxuries}</p>
        <p>Medicine: {props.info.medicine}</p>
        <p>Weapons: {props.info.weapons}</p>
      </div>
    </div>
  )
}

export default infoPanel;