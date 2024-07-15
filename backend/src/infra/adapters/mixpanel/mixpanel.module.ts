import { Module } from '@nestjs/common';
import { MixpanelAdapter } from './mixpanel-adapter';
import { EventTrackingPort } from '@backend/core/ports/event-tracking-port.interface';
import { DatabaseModule } from '@backend/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: EventTrackingPort,
      useClass: MixpanelAdapter,
    },
    MixpanelAdapter,
  ],
  exports: [EventTrackingPort, MixpanelAdapter],
})
export class MixpanelModule {}
