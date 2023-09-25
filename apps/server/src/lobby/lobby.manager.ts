import { Socket } from 'socket.io';
import { Lobby } from './lobby';
import { LobbyCreateDto } from './lobby.dto';

import { WsException } from '@nestjs/websockets';

export class LobbyManager {
  private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<Lobby['id'], Lobby>();

  public create(newLobby: LobbyCreateDto) {
    const { mode } = newLobby;
    // new lobby instance
    const maxPlayers = {
      solo: 1,
      duo: 2,
    };

    const lobby = new Lobby(maxPlayers[mode]);
    // add the lobby to the map
    this.lobbies.set(lobby.id, lobby);

    return lobby;
  }

  public join(id: string, player: Socket) {
    const lobby = this.lobbies.get(id);
    if (!lobby) {
      throw new WsException('Lobby doesnt exist');
    }

    if (lobby.players.size >= lobby.maxPlayers) {
      throw new WsException('Lobby is full');
    }

    lobby.addPlayer(player);
  }
}
