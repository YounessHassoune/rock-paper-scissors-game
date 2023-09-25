import { Socket } from 'socket.io';
import { GameInstance } from 'src/game/game.instance';
import { v4 } from 'uuid';

export class Lobby {
  public readonly id: string = v4();

  public readonly createdAt: Date = new Date();

  public readonly players: Map<Socket['id'], Socket> = new Map<Socket['id'], Socket>();

  // public readonly gameInstance: GameInstance = new GameInstance(this);

  constructor(public readonly maxPlayers) {}

  public addPlayer(player: Socket): void {
    this.players.set(player.id, player);
    player.join(this.id);
    player.data.lobby = this;
    // this.gameInstance.start();
    // ! we shoul update the dispatch the game state to all  players
  }
}
