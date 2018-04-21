//Core
import React, { Component } from 'react'

//Components
import InfoPanel from '../infoPanel/infoPanel';
import InputPanel from '../inputPanel/inputPanel';
import LogPanel from '../logPanel/logPanel';
import MapPanel from '../mapPanel/mapPanel';

//CSS
import classes from './game.css'

class Game extends Component {
  state = {
    log: [ "Welcome To The Game", "Enter Help For Commands"],
    info: {
      pop: 10,
      food: 100,
      wood: 0,
      stone: 0,
      iron: 0,
      happiness: 0,
      clothes: 0,
      luxuries: 0,
      medicine: 0,
      weapons: 0
    }
  }

  keyPressed = (e) => {
    if(e.which !== 13) {
      return
    } else {
      let currentInfo = {...this.state.info}
      let updatedLog = this.state.log
      updatedLog.push(e.target.value)
      const currentCommand = e.target.value.toLowerCase().split(' ')
      switch(currentCommand[0]) {
        case 'add':
          currentInfo.food = this.state.info.food + 5
          break;
        default:
          updatedLog.push(`${currentCommand[0]} is not a valid command.`)
      }
      e.target.value = ''
      this.setState({...this.state, log: updatedLog, info: currentInfo})
    }
  }

  tick = (length) => {
    setInterval(() => {
      let currentInfo = this.state.info;
      currentInfo.food = currentInfo.food - currentInfo.pop
      if(currentInfo.food <= 0) {
        currentInfo.food = 0;
      }
      this.setState({...this.state, info: currentInfo});
    }, length)
  }

  componentDidMount() {
    this.tick(1000 * 5);
  }

  render() {
    return (
      <div className={classes.game}>
        <LogPanel log={this.state.log}/>
        <MapPanel/>
        <InfoPanel info={this.state.info}/>
        <InputPanel keyPress={this.keyPressed}/>
      </div>
    )
  }
}

export default Game
