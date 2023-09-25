import { Lobby } from 'src/lobby/lobby';

export class GameInstance {
  public hasStarted: boolean = false;

  public hasFinished: boolean = false;

  public currentRound: number = 1;

  public scores: any;

  constructor(private readonly lobby: Lobby) {}

  public start() {}
}
