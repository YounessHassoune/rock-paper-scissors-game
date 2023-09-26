import { Lobby } from 'src/lobby/lobby';
import { PLAYERCHOICE } from 'src/lobby/lobby.dto';
import { SERVER_EVENTS } from 'src/shared/server';

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

  public shoot(choice: PLAYERCHOICE) {
    console.log(this.lobby);
  }
}
