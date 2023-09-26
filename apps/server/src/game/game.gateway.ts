import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LobbyCreateDto, LobbyJoinDto, PlayDto } from 'src/lobby/lobby.dto';
import { LobbyManager } from 'src/lobby/lobby.manager';
import { CLIENT_EVENTS } from 'src/shared/client';
import { WebsocketExceptionsFilter } from './gamer.filter';
import { Player } from 'src/shared/server';
import { Lobby } from 'src/lobby/lobby';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'game',
})
@UsePipes(
  new ValidationPipe({
    transform: true,
    always: true,
  }),
)
@UseFilters(new WebsocketExceptionsFilter())
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
  onCreateLobby(player: Player, data: LobbyCreateDto): any {
    // lobby manager creates a lobby
    this.lobbyManager.create(player, data);
  }

  @SubscribeMessage(CLIENT_EVENTS.JOIN_LOBBY)
  onJoinLobby(player: Player, data: LobbyJoinDto): any {
    this.lobbyManager.join(data, player);
  }

  @SubscribeMessage(CLIENT_EVENTS.SHOOT)
  onShoot(player: Player, data: PlayDto): any {
    const playerData: { lobby: null | Lobby } = player.data;
    const { choice } = data;

    if (!playerData.lobby) {
      throw new WsException('You are not in a lobby');
    }

    //call the shoot function passing the
    playerData.lobby.gameInstance.shoot(choice);
  }
}
