import { IsString } from 'class-validator';

export class LobbyCreateDto {
  @IsString()
  mode: 'solo' | 'duo';
}


 