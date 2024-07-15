import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum CancellationStatus {
  PAUSED = 'Paused',
  COMPLETED = 'Completed',
  DISCOUNT = 'Discount',
}

class CancellationDataDto {
  @IsOptional()
  @IsInt()
  educationLevelId?: number;

  @IsOptional()
  @IsInt()
  universityCourseAreaId?: number;

  @IsOptional()
  @IsInt()
  productImprovementId?: number;

  @IsOptional()
  @IsInt()
  productRatingId?: number;

  @IsOptional()
  @IsInt()
  cancellationReasonId?: number;
}

class CancellationDataStringDto {
  @IsOptional()
  @IsString()
  educationLevel?: string;

  @IsOptional()
  @IsString()
  universityCourseArea?: string;

  @IsOptional()
  @IsString()
  productImprovement?: string;

  @IsOptional()
  @IsString()
  productRating?: string;

  @IsOptional()
  @IsString()
  cancellationReason?: string;

  @IsOptional()
  @IsString()
  couponName?: string;

  @IsOptional()
  @IsString()
  cancellationStatus?: string;
}

export class UpdateUserSubscriptionDto {
  @IsOptional()
  @IsString()
  couponName: string;

  @IsEnum(CancellationStatus)
  cancellationStatus: CancellationStatus;

  @IsNotEmpty()
  isCancelling: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CancellationDataDto)
  cancellationData?: CancellationDataDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CancellationDataStringDto)
  cancellationDataString?: CancellationDataStringDto;
}
