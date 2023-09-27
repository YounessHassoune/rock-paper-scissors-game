import { Lobby } from 'src/lobby/lobby';
import { PLAYERCHOICE } from 'src/lobby/lobby.dto';
import { Player, SERVER_EVENTS } from 'src/shared/server';

export class GameInstance {
  public hasStarted: boolean = false;

  public hasFinished: boolean = false;

  public currentRound: number = 1;

  public score: any;

  constructor(private readonly lobby: Lobby) {}

  public start() {
    if (this.hasStarted) return;
    this.hasStarted = true;
    this.lobby.updateLobby(SERVER_EVENTS.LOBBY_UPDATES, this.lobby.getLobbystate());
  }

  public shoot(choice: PLAYERCHOICE, player: Player) {
    // check if the game is started or ended
    if (!this.hasStarted || this.hasFinished) return;
    let choiceCount = 0;
    //check if its solo or duo
    console.log('hamid');
    if (this.lobby.maxPlayers === 1) {
      // check if the player already played
      // if not generate arandom choise and deside the winner
      const botChoice = this.getRandomChoice();
      const roundDetails = {
        player1: {
          id: player.id,
          choice,
        },
        player2: {
          id: 'bot',
          choice: botChoice,
        },
      };
      const winner = this.getWinner(choice, botChoice);
     
      // update the round and the score
    } else {
      // check if the  player already played
      // check if all players choosed
      // desice the winner
      // update the scor and the round
    }
  }

  public getRandomChoice(): PLAYERCHOICE {
    const values = Object.values(PLAYERCHOICE);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex] as PLAYERCHOICE;
  }

  public getWinner(choice_1: PLAYERCHOICE, choice_2: PLAYERCHOICE) {
    if (choice_1 === choice_2) return 'draw';
    const rules = {
      [PLAYERCHOICE.rock]: PLAYERCHOICE.scissors,
      [PLAYERCHOICE.paper]: PLAYERCHOICE.rock,
      [PLAYERCHOICE.scissors]: PLAYERCHOICE.paper,
    };
    if (rules[choice_1] === choice_2) {
      return choice_1;
    } else {
      return choice_2;
    }
  }
}
