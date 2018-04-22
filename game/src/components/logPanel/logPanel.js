//Core
import React from 'react'

//Components
import Wrapper from '../wrapper/wrapper';

//CSS
import classes from './logPanel.css'

const logPanel = (props) => {
  return (
    <div id='log' className={classes.logPanel}>
      {props.log.map((x, index) => {
        return (
          <Wrapper>
            <p key={index}>{x}</p>
            <br/>
          </Wrapper>
        )
      })}
    </div>
  )
}

export default logPanel;