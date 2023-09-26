import { Socket, Server } from 'socket.io';
import { Lobby } from './lobby';
import { LobbyCreateDto, LobbyJoinDto } from './lobby.dto';

import { WsException } from '@nestjs/websockets';

export class LobbyManager {
  public server: Server;
  private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<Lobby['id'], Lobby>();

  public create(player: Socket, newLobby: LobbyCreateDto) {
    const { mode } = newLobby;
    const maxPlayers = {
      solo: 1,
      duo: 2,
    };
    //create new lobby with max numbr of players
    const lobby = new Lobby(this.server, maxPlayers[mode]);
    // add the new lobby to lobbies map
    this.lobbies.set(lobby.id, lobby);
    // add the player to the created lobb
    lobby.addPlayer(player);
    return lobby;
  }

  public join(data: LobbyJoinDto, player: Socket) {
    // get the lobby by id
    const lobby = this.lobbies.get(data.id);
    if (!lobby) {
      throw new WsException('Lobby doesnt exist');
    }
    // check if the lobby is full
    if (lobby.players.size >= lobby.maxPlayers) {
      throw new WsException('Lobby is full');
    }
    lobby.addPlayer(player);
  }
}
