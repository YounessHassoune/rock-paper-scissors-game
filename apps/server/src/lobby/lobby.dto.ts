import { IsEnum, IsString, IsUUID } from 'class-validator';

export enum LOBBYMODE {
  'solo',
  'duo',
}
export enum PLAYERCHOICE {
  'rock',
  'paper',
  'scissors',
}

export class LobbyCreateDto {
  @IsString()
  @IsEnum(LOBBYMODE)
  mode: LOBBYMODE;
}

export class LobbyJoinDto {
  @IsString()
  @IsUUID()
  id: string;
}

export class PlayDto {
  @IsString()
  @IsEnum(PLAYERCHOICE)
  choice: PLAYERCHOICE;
}
