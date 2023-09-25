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
import { LobbyCreateDto } from 'src/lobby/lobby.dto';
import { LobbyManager } from 'src/lobby/lobby.manager';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'game',
})
// @UsePipes(new ValidationPipe())
export class GameGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() wss: Server;

  constructor(private readonly lobbyManager: LobbyManager) {}

  afterInit(server: Server) {
    console.log('Websocket Gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {}

  @SubscribeMessage('create-lobby')
  onCreateLobby(player: Socket, data: LobbyCreateDto): any {
    // lobby manager creates a lobby
    const lobby = this.lobbyManager.create(data);
    console.log('this is the lobby', lobby);

    return {
      event: 'create-lobby',
      data: {
        message: 'Lobby created',
      },
    };
  }

  @SubscribeMessage('create-lobby')
  onJoinLobby(id: string, player: Socket): any {
    this.lobbyManager.join(id, player);
  }
}
