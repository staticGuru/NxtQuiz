import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class MixpanelRequestDto {
  @ApiProperty({
    required: true,
    description: 'Event name to be tracked.',
  })
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  eventName: string;
}
