import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LobbyCreateDto, LobbyJoinDto } from 'src/lobby/lobby.dto';
import { LobbyManager } from 'src/lobby/lobby.manager';
import { CLIENT_EVENTS } from 'src/shared/client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'game',
})
@UsePipes(new ValidationPipe())
export class GameGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() wss: Server;

  constructor(private readonly lobbyManager: LobbyManager) {}

  afterInit(server: Server) {
    this.lobbyManager.server = server;
  }

  handleConnection(player: Socket, ...args: any[]) {
    console.log(`player connected : ${player.id}`);
  }

  @SubscribeMessage(CLIENT_EVENTS.CREATE_LOBBY)
  onCreateLobby(player: Socket, data: LobbyCreateDto): any {
    // lobby manager creates a lobby
    console.log('creating lobby ....');
    const lobby = this.lobbyManager.create(player, data);
    return {
      event: 'create-lobby',
      data: {
        message: 'Lobby created',
      },
    };
  }

  @SubscribeMessage(CLIENT_EVENTS.JOIN_LOBBY)
  onJoinLobby(player: Socket,data: LobbyJoinDto): any {
    console.log("data",data);
    this.lobbyManager.join(data, player);
  }
}
