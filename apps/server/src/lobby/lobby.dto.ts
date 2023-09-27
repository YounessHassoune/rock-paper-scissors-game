import { IsEnum, IsString, IsUUID } from 'class-validator';

export enum LOBBYMODE {
  'solo',
  'duo',
}
export enum PLAYERCHOICE {
  'rock'='rock',
  'paper'='paper',
  'scissors'='scissors',
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

// export type RoundDetails ={
//   winner:string,
//   round:number,
//   player1:{
//     id:string
//   }
//   player2:
// }

// export type = {

// }