import { IsString, IsUUID } from 'class-validator';

export class LobbyCreateDto {
  @IsString()
  mode: 'solo' | 'duo';
}

export class LobbyJoinDto {
  @IsString()
  @IsUUID()
  id:string;
}
