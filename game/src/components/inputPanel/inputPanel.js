//Core
import React from 'react'

//CSS
import classes from './inputPanel.css'

const inputPanel = props => {
  return (
    <div className={classes.inputPanel}>
      <input type="text" placeholder="Enter Command..." onKeyPress={props.keyPress} autofocus='true'/>
    </div>
  )
}

export default inputPanel;