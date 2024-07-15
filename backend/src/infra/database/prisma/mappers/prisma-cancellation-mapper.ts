import { cancellation as PrismaCancellation, Prisma } from '@prisma/client';
import { Cancellation } from '@backend/domain/cancellation-flow/entities/cancellation-entity';

export class PrismaCancellationMapper {
  static toDomain(raw: PrismaCancellation): Cancellation {
    return Cancellation.create({
      userId: raw.user_id,
      educationLevelId: raw.education_level_id ?? 0,
      universityCourseAreaId: raw.university_course_area_id ?? 0,
      productImprovementId: raw.product_improvement_id ?? 0,
      productRatingId: raw.product_rating_id ?? 0,
      cancellationReasonId: raw.cancellation_reason_id ?? 0,
      cancellationStatus: raw.cancellation_status ?? '',
    });
  }

  static toPrisma(
    cancellation: Cancellation,
  ): Prisma.cancellationUncheckedCreateInput {
    return {
      user_id: cancellation.userId,
      education_level_id: cancellation.educationLevelId,
      university_course_area_id: cancellation.universityCourseAreaId,
      product_improvement_id: cancellation.productImprovementId,
      product_rating_id: cancellation.productRatingId,
      cancellation_reason_id: cancellation.cancellationReasonId,
      cancellation_status: cancellation.cancellationStatus,
    };
  }
}
