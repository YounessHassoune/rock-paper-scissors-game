import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { GameModule } from './game/game.module';

@Module({
  imports: [GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
