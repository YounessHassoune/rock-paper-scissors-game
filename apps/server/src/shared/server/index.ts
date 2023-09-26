import { Socket } from 'socket.io';
import { Lobby } from 'src/lobby/lobby';

export enum SERVER_EVENTS {
  LOBBY_UPDATES = 'server.lobby.updates',
}

export type Player = Socket & {
  data: {
    lobby: null | Lobby;
  };
};
