//Core
import React from 'react'

//CSS
import classes from './buildingsPanel.css'

//Constants
import structures from '../../constants/structures';

const buildingsPanel = (props) => {
  return (
    <div className={classes.buildingsPanel}>
      <h1 className={classes.heading}>Buildings</h1>
      <div className={classes.left}>
        <p>Hut: {props.buildings.hut} - +{structures.hut.benefit.pop * props.buildings.hut} Total Population</p>
        <p>Farm: {props.buildings.farm} - +{structures.farm.benefit.food * props.buildings.farm} Food/Turn</p>
        <p>Sawmill: {props.buildings.sawmill} - +{structures.sawmill.benefit.wood * props.buildings.sawmill} Wood/Turn</p>
        <p>Quarry: {props.buildings.quarry} - +{structures.quarry.benefit.stone * props.buildings.quarry} Stone/Turn</p>
        <p>Mine: {props.buildings.mine} - +{structures.mine.benefit.iron * props.buildings.mine} Iron/Turn</p>
        <p>Alchemist: {props.buildings.alchemist} - +{structures.alchemist.benefit.medicine * props.buildings.alchemist} Medicine/Turn</p>
      </div>
      <div className={classes.right}>
        <p>Brewery: {props.buildings.brewery} - +{structures.brewery.benefit.luxuries * props.buildings.brewery} Luxuries/Turn</p>
        <p>Carpenter: {props.buildings.carpenter} - +{structures.carpenter.benefit.luxuries * props.buildings.carpenter} Luxuries/Turn</p>
        <p>Sculptor: {props.buildings.sculptor} - +{structures.sculptor.benefit.luxuries * props.buildings.sculptor} Luxuries/Turn</p>
        <p>Jeweler: {props.buildings.jeweler} - +{structures.jeweler.benefit.luxuries * props.buildings.jeweler} Luxuries/Turn</p>
        <p>Blacksmith: {props.buildings.blacksmith} - +{structures.blacksmith.benefit.weapons * props.buildings.blacksmith} Weapons/Turn</p>
        <p>Church: {props.buildings.church} - +{structures.church.benefit.happiness * props.buildings.church} Happiness/Turn</p>
      </div>
    </div>
  )
}

export default buildingsPanel;