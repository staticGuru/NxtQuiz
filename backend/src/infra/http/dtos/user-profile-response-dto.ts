import { User } from '@backend/domain/user/entities/user-entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponseDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  examId: number | null;

  @ApiProperty()
  examYear: number | null;

  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  updatedOn: Date | null | undefined;

  @ApiProperty()
  createdOn: Date;

  public static toDto(user: User): UserProfileResponseDto {
    return {
      userId: user.userId,
      examId: user.examId,
      examYear: user.examYear,
      countryCode: user.countryCode,
      createdOn: user.createdOn,
      updatedOn: user.updatedOn,
      name: user.name,
      email: user.email,
    };
  }
}
