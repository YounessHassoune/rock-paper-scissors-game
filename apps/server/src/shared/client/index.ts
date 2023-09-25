export enum CLIENT_EVENTS {
    CREATE_LOBBY='client.create.lobby',
    JOIN_LOBBY='client.join.lobby'
}

export enum ClientEvents
{
  // General
  Ping = 'client.ping',

  // Lobby
  LobbyCreate = 'client.lobby.create',
  LobbyJoin = 'client.lobby.join',
  LobbyLeave = 'client.lobby.leave',

  // Game
  GameRevealCard = 'client.game.reveal_card',
}
