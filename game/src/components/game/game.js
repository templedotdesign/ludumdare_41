//Core
import React, { Component } from 'react'

//Components
import InfoPanel from '../infoPanel/infoPanel';
import InputPanel from '../inputPanel/inputPanel';
import LogPanel from '../logPanel/logPanel';
import BuildingsPanel from '../buildingsPanel/buildingsPanel';

//CSS
import classes from './game.css'

//Constants
import help from '../../constants/help';
import structures from '../../constants/structures';
import list from '../../constants/list';

class Game extends Component {
  state = {
    paused: true,
    log: ["The Game Is Paused", "Enter Help For Commands", "Welcome To Banished To Simtext Valley: Skylines!"],
    info: {
      pop: 10,
      idlePop: 10,
      food: 100,
      wood: 5,
      stone: 0,
      iron: 0,
      happiness: 0,
      luxuries: 0,
      medicine: 0,
      weapons: 0
    },
    buildableStructures: structures,
    buildings: {
      hut: 0,
      sawmill: 0,
      farm: 0,
      quarry: 0,
      mine: 0,
      brewery: 0,
      carpenter: 0,
      sculptor: 0,
      jeweler: 0,
      alchemist: 0,
      blacksmith: 0,
      church: 0
    } 
  }

  keyPressed = (e) => {
    if(e.which !== 13) {
      return
    } else {
      let currentInfo = {...this.state.info}
      let pauseState = this.state.paused
      let updatedLog = this.state.log
      updatedLog.unshift(e.target.value)
      const currentCommand = e.target.value.toLowerCase().trim().split(' ')
      switch(currentCommand[0]) {
        case 'list':
          updatedLog = list.concat(updatedLog)
          break;
        case 'build':
          if(this.state.paused) {
            updatedLog.unshift('The game is paused.  The build command cannot be used while paused.')
            break;
          }
          this.processBuild(currentCommand[1], currentInfo, updatedLog, this.state.buildings)
          break;
        case 'help':
          updatedLog = help.concat(updatedLog)
          break;
        case 'pause':
          pauseState = true
          updatedLog.unshift('The game is paused')
          break
        case 'unpause':
          updatedLog.unshift('The game is unpaused')
          pauseState = false
          break
        case 'explain':
          this.processExplain(currentCommand[1], updatedLog)
          break
        default:
          updatedLog.unshift(`${currentCommand[0]} is not a valid command.`)
      }
      e.target.value = ''
      this.setState({...this.state, log: updatedLog, info: currentInfo, paused: pauseState})
    }
  }

  tick = (length) => {
    setInterval(() => {
      if(this.state.paused) {
        return
      }
      let currentInfo = {...this.state.info};
      let currentLog = this.state.log;
      let pauseState = this.state.paused;
      const buildings = this.state.buildings
      if(buildings.sawmill > 0) {
        currentInfo.wood = currentInfo.wood + (this.state.buildableStructures.sawmill.benefit.wood * buildings.sawmill)
      }
      if(buildings.farm > 0) {
        currentInfo.food = currentInfo.food + (this.state.buildableStructures.farm.benefit.food * buildings.farm)
      }
      if(buildings.quarry > 0) {
        currentInfo.stone = currentInfo.stone + (this.state.buildableStructures.quarry.benefit.stone * buildings.quarry)
      }
      if(buildings.mine > 0) {
        currentInfo.iron = currentInfo.iron + (this.state.buildableStructures.mine.benefit.iron * buildings.mine)
      }
      if(buildings.brewery > 0) {
        const brewery = this.state.buildableStructures.brewery
        for(let i = 0; i < buildings.brewery; i++) {
          if(currentInfo.food >= brewery.mats.food) {
            currentInfo.food = currentInfo.food - brewery.mats.food
            currentInfo.luxuries = currentInfo.luxuries + brewery.benefit.luxuries
          } else {
            currentLog.unshift("One of your breweries doesn't have enough supplies.")
          }
        }
      }
      if(buildings.carpenter > 0) {
        const carpenter = this.state.buildableStructures.carpenter
        for(let i = 0; i < buildings.carpenter; i++) {
          if(currentInfo.wood >= carpenter.mats.wood) {
            currentInfo.wood = currentInfo.wood - carpenter.mats.wood
            currentInfo.luxuries = currentInfo.luxuries + carpenter.benefit.luxuries
          } else {
            currentLog.unshift("One of your carpenters doesn't have enough supplies.")
          }
        }
      }
      if(buildings.sculptor > 0) {
        const sculptor = this.state.buildableStructures.sculptor
        for(let i = 0; i < buildings.sculptor; i++) {
          if(currentInfo.stone >= sculptor.mats.stone) {
            currentInfo.stone = currentInfo.stone - sculptor.mats.stone
            currentInfo.luxuries = currentInfo.luxuries + sculptor.benefit.luxuries
          } else {
            currentLog.unshift("One of your sculptors doesn't have enough supplies.")
          }
        }
      }
      if(buildings.jeweler > 0) {
        const jeweler = this.state.buildableStructures.jeweler
        for(let i = 0; i < buildings.jeweler; i++) {
          if(currentInfo.iron >= jeweler.mats.iron) {
            currentInfo.iron = currentInfo.iron - jeweler.mats.iron
            currentInfo.luxuries = currentInfo.luxuries + jeweler.benefit.luxuries
          } else {
            currentLog.unshift("One of your jewelers doesn't have enough supplies.")
          }
        }
      }
      if(buildings.alchemist > 0) {
        const alchemist = this.state.buildableStructures.alchemist
        for(let i = 0; i < buildings.alchemist; i++) {
          if(currentInfo.food >= alchemist.mats.food && currentInfo.stone >= alchemist.mats.stone) {
            currentInfo.food = currentInfo.food - alchemist.mats.food
            currentInfo.stone = currentInfo.stone - alchemist.mats.stone
            currentInfo.medicine = currentInfo.medicine + alchemist.benefit.medicine
          } else {
            currentLog.unshift("One of your alchemists doesn't have enough supplies.")
          }
        }
      }
      if(buildings.blacksmith > 0) {
        const blacksmith = this.state.buildableStructures.blacksmith
        for(let i = 0; i < buildings.blacksmith; i++) {
          if(currentInfo.wood >= blacksmith.mats.wood && currentInfo.iron >= blacksmith.mats.iron) {
            currentInfo.wood = currentInfo.wood - blacksmith.mats.wood
            currentInfo.iron = currentInfo.iron - blacksmith.mats.iron
            currentInfo.weapons = currentInfo.weapons + blacksmith.benefit.weapons
          } else {
            currentLog.unshift("One of your blacksmiths doesn't have enough supplies.")
          }
        }
      }
      if(buildings.church > 0) {
        currentInfo.happiness = currentInfo.happiness + (this.state.buildableStructures.church.benefit.happiness * buildings.church)
      }
      currentInfo.food = currentInfo.food - currentInfo.pop
      if(currentInfo.food <= 0) {
        currentInfo.food = 0;
      }
      if(currentInfo.happiness < 100) {
        if(currentInfo.happiness > -100) {
          if(currentInfo.luxuries >= 10) {
            currentInfo.luxuries = currentInfo.luxuries - 10
            currentInfo.happiness = currentInfo.happiness + 1
          }
          if(currentInfo.food <= 0) {
            currentInfo.happiness = currentInfo.happiness - 5
            currentLog.unshift('Your people are starving and becoming unhappy.  You need to build some farms.')
          }
        } else {
          pauseState = true;
          currentLog.unshift("YOUR HAPPINESS HAS FALLEN TO -100.  YOU LOSE.")
        }
      } else {
        pauseState = true;
        currentLog.unshift('YOU HAVE ACHIEVED 100 HAPPINESS!!!  YOU WIN!!!!!')
      }
      this.setState({...this.state, info: currentInfo, log: currentLog, paused: pauseState});
    }, length)
  }

  processBuild = (structure, info, log, buildings) => {
    if(this.state.paused) {
      log.unshift("You cannot build while the game is paused.")
      return
    }
    switch(structure) {
      case 'hut':
        let cost = this.state.buildableStructures.hut.cost
        if(info.wood >= cost.wood) {
          info.wood = info.wood - cost.wood
          buildings.hut = buildings.hut + 1
          info.pop = info.pop + this.state.buildableStructures.hut.benefit.pop
          info.idlePop = info.idlePop + this.state.buildableStructures.hut.benefit.pop
          log.unshift('You built a hut.')
        } else {
          log.unshift('You do not have enough wood to build a hut.')
        }
        break;
      case 'sawmill':
        cost = this.state.buildableStructures.sawmill.cost
        if(info.wood >= cost.wood) {
          if(info.idlePop >= cost.pop) {
            buildings.sawmill = buildings.sawmill + 1
            info.wood = info.wood - cost.wood
            info.idlePop = info.idlePop - cost.pop
            log.unshift('You built a sawmill.')
          } else {
            log.unshift('You do not have enough idle population to build a sawmill.')
          } 
        } else {
          log.unshift('You do not have enough wood to build a sawmill.')
        }
        break;
      case 'farm':
        cost = this.state.buildableStructures.farm.cost
        if(info.idlePop >= cost.pop) {
          buildings.farm = buildings.farm + 1
          info.idlePop = info.idlePop - cost.pop
          log.unshift('You built a farm.')
        } else {
          log.unshift('You do not have enough idle Population to build a farm.')
        }
        break;
      case 'quarry':
        cost = this.state.buildableStructures.quarry.cost
        if(info.idlePop >= cost.pop) {
          if(info.wood >= cost.wood) {
            buildings.quarry = buildings.quarry + 1
            info.wood = info.wood - cost.wood
            info.idlePop = info.idlePop - cost.pop
            log.unshift('You built a quarry.')
          } else {
            log.unshift('You do not have enough wood to build a quarry')
          }
        } else {
          log.unshift('You do not have enough idle Population to build a quarry.')
        }
        break;
      case 'mine':
        cost = this.state.buildableStructures.mine.cost
        if(info.idlePop >= cost.pop) {
          if(info.wood >= cost.wood) {
            if(info.stone >= cost.stone) {
              buildings.mine = buildings.mine + 1
              info.wood = info.wood - cost.wood
              info.idlePop = info.idlePop - cost.pop
              info.stone = info.stone - cost.stone
              log.unshift('You built a mine.')
            } else {
              log.unshift('You do not have enough stone to build a mine.')
            }
          } else {
            log.unshift('You do not have enough wood to build a mine')
          }
        } else {
          log.unshift('You do not have enough idle Population to build a mine.')
        }
        break;
      case 'brewery':
        cost = this.state.buildableStructures.brewery.cost
        if(info.idlePop >= cost.pop) {
          if(info.wood >= cost.wood) {
            if(info.stone >= cost.stone) {
              if(info.iron >= cost.iron) {
                buildings.brewery = buildings.brewery + 1
                info.wood = info.wood - cost.wood
                info.idlePop = info.idlePop - cost.pop
                info.stone = info.stone - cost.stone
                info.iron = info.iron - cost.iron
                log.unshift('You built a brewery.')
              } else {
                log.unshift('You do not have enough iron to build a brewery')
              }
            } else {
              log.unshift('You do not have enough stone to build a brewery.')
            }
          } else {
            log.unshift('You do not have enough wood to build a brewery')
          }
        } else {
          log.unshift('You do not have enough idle Population to build a brewery.')
        }
        break;
      case 'carpenter':
        cost = this.state.buildableStructures.carpenter.cost
        if(info.idlePop >= cost.pop) {
          if(info.wood >= cost.wood) {
            if(info.stone >= cost.stone) {
              if(info.iron >= cost.iron) {
                buildings.carpenter = buildings.carpenter + 1
                info.wood = info.wood - cost.wood
                info.idlePop = info.idlePop - cost.pop
                info.stone = info.stone - cost.stone
                info.iron = info.iron - cost.iron
                log.unshift('You built a carpenter.')
              } else {
                log.unshift('You do not have enough iron to build a carpenter')
              }
            } else {
              log.unshift('You do not have enough stone to build a carpenter.')
            }
          } else {
            log.unshift('You do not have enough wood to build a carpenter')
          }
        } else {
          log.unshift('You do not have enough idle Population to build a carpenter.')
        }
        break;
      case 'sculptor':
        cost = this.state.buildableStructures.sculptor.cost
        if(info.idlePop >= cost.pop) {
          if(info.wood >= cost.wood) {
            if(info.stone >= cost.stone) {
              if(info.iron >= cost.iron) {
                buildings.sculptor = buildings.sculptor + 1
                info.wood = info.wood - cost.wood
                info.idlePop = info.idlePop - cost.pop
                info.stone = info.stone - cost.stone
                info.iron = info.iron - cost.iron
                log.unshift('You built a sculptor.')
              } else {
                log.unshift('You do not have enough iron to build a sculptor.')
              }
            } else {
              log.unshift('You do not have enough stone to build a sculptor.')
            }
          } else {
            log.unshift('You do not have enough wood to build a sculptor.')
          }
        } else {
          log.unshift('You do not have enough idle Population to build a sculptor.')
        }
        break;
      case 'jeweler':
        cost = this.state.buildableStructures.jeweler.cost
        if(info.idlePop >= cost.pop) {
          if(info.wood >= cost.wood) {
            if(info.stone >= cost.stone) {
              if(info.iron >= cost.iron) {
                buildings.jeweler = buildings.jeweler + 1
                info.wood = info.wood - cost.wood
                info.idlePop = info.idlePop - cost.pop
                info.stone = info.stone - cost.stone
                info.iron = info.iron - cost.iron
                log.unshift('You built a jeweler.')
              } else {
                log.unshift('You do not have enough iron to build a jeweler')
              }
            } else {
              log.unshift('You do not have enough stone to build a jeweler.')
            }
          } else {
            log.unshift('You do not have enough wood to build a jeweler')
          }
        } else {
          log.unshift('You do not have enough idle Population to build a jeweler.')
        }
        break;
      case 'alchemist':
        cost = this.state.buildableStructures.alchemist.cost
        if(info.idlePop >= cost.pop) {
          if(info.wood >= cost.wood) {
            if(info.stone >= cost.stone) {
              if(info.iron >= cost.iron) {
                buildings.alchemist = buildings.alchemist + 1
                info.wood = info.wood - cost.wood
                info.idlePop = info.idlePop - cost.pop
                info.stone = info.stone - cost.stone
                info.iron = info.iron - cost.iron
                log.unshift('You built an alchemist.')
              } else {
                log.unshift('You do not have enough iron to build an alchemist')
              }
            } else {
              log.unshift('You do not have enough stone to build an alchemist.')
            }
          } else {
            log.unshift('You do not have enough wood to build an alchemist')
          }
        } else {
          log.unshift('You do not have enough idle Population to build an alchemist.')
        }
        break;
      case 'blacksmith':
        cost = this.state.buildableStructures.blacksmith.cost
        if(info.idlePop >= cost.pop) {
          if(info.wood >= cost.wood) {
            if(info.stone >= cost.stone) {
              if(info.iron >= cost.iron) {
                buildings.blacksmith = buildings.blacksmith + 1
                info.wood = info.wood - cost.wood
                info.idlePop = info.idlePop - cost.pop
                info.stone = info.stone - cost.stone
                info.iron = info.iron - cost.iron
                log.unshift('You built a blacksmith.')
              } else {
                log.unshift('You do not have enough iron to build a blacksmith')
              }
            } else {
              log.unshift('You do not have enough stone to build a blacksmith.')
            }
          } else {
            log.unshift('You do not have enough wood to build a blacksmith')
          }
        } else {
          log.unshift('You do not have enough idle Population to build a blacksmith.')
        }
        break;
      case 'church':
        cost = this.state.buildableStructures.church.cost
        if(info.idlePop >= cost.pop) {
          if(info.wood >= cost.wood) {
            if(info.stone >= cost.stone) {
              if(info.iron >= cost.iron) {
                buildings.church = buildings.church + 1
                info.wood = info.wood - cost.wood
                info.idlePop = info.idlePop - cost.pop
                info.stone = info.stone - cost.stone
                info.iron = info.iron - cost.iron
                log.unshift('You built a church.')
              } else {
                log.unshift('You do not have enough iron to build a church')
              }
            } else {
              log.unshift('You do not have enough stone to build a church.')
            }
          } else {
            log.unshift('You do not have enough wood to build a church')
          }
        } else {
          log.unshift('You do not have enough idle Population to build a church.')
        }
        break;
      default:
        log.unshift(`${structure} is not a valid structure.`)
    }
    this.setState({...this.state, info: info, buildings: buildings, log: log})
  }

  processExplain = (structure, log) => {
    switch(structure) {
      case 'hut':
        log.unshift(list[0]);
        break;
      case 'farm':
        log.unshift(list[1]);
        break;
      case 'sawmill':
        log.unshift(list[2]);
        break;
      case 'quarry':
        log.unshift(list[3]);
        break;
      case 'mine':
        log.unshift(list[4]);
        break;
      case 'brewery':
        log.unshift(list[5]);
        break;
      case 'carpenter':
        log.unshift(list[6]);
        break;
      case 'sculptor':
        log.unshift(list[7]);
        break;
      case 'jeweler':
        log.unshift(list[8]);
        break;
      case 'alchemist':
        log.unshift(list[9]);
        break;
      case 'blacksmith':
        log.unshift(list[10]);
        break;
      case 'church':
        log.unshift(list[11]);
        break;
      default:
        log.unshift(`${structure} cannot be explained.`)
    }
    this.setState({...this.state, log: log})
  }

  componentDidMount() {
    this.tick(1000 * 3);
  }

  render() {
    return (
      <div className={classes.game}>
        <LogPanel log={this.state.log}/>
        <BuildingsPanel buildings={this.state.buildings}/>
        <InfoPanel info={this.state.info}/>
        <InputPanel keyPress={this.keyPressed}/>
      </div>
    )
  }
}

export default Game
