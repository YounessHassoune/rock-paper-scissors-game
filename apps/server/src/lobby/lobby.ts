import { Server, Socket } from 'socket.io';
import { GameInstance } from 'src/game/game.instance';
import { SERVER_EVENTS } from 'src/shared/server';
import { v4 } from 'uuid';

export class Lobby {
  public readonly id: string = v4();

  public readonly createdAt: Date = new Date();

  public readonly players: Map<Socket['id'], Socket> = new Map<Socket['id'], Socket>();

  // public readonly gameInstance: GameInstance = new GameInstance(this);

  constructor(
    private readonly server: Server,
    public readonly maxPlayers: number,
  ) {}

  public addPlayer(player: Socket): void {
    try {
      this.players.set(player.id, player);
      player.join(this.id);
      player.data.lobby = this;
      this.updateLobby(SERVER_EVENTS.LOBBY_UPDATES, this.getLobbystate());
      // this.gameInstance.start();
      // ! we shoul update the dispatch the game state to all  players
    } catch (e) {
      console.log(e);
    }
  }

  public updateLobby<T>(event: string, paylaod: T) {
    this.server.to(this.id).emit(event, paylaod);
  }

  public getLobbystate() {
    return {
      lobbyId: this.id,
      players: this.players,
      mode: this.maxPlayers === 1 ? 'solo' : 'duo',
      createdAt: this.createdAt,
      playersCount: this.players.size,
    };
  }
}
