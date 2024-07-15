import { Module } from '@nestjs/common';
import { DatabaseModule } from '@backend/infra/database/database.module';
import { LoadUserProfileUseCase } from '@backend/domain/user/use-cases/load-user-profile-use-case';
import { UpdateUserProfileUseCase } from '@backend/domain/user/use-cases/update-user-profile-use-case';
import { UserProfileController } from './controllers/user-profile.controller';
import { NoteController } from './controllers/note.controller';
import { CountryController } from './controllers/country.controller';
import { CountryListUseCase } from '@backend/domain/country/use-cases/country-list-use-case';
import { ExamYearController } from './controllers/exam-year.controller';
import { ExamYearListUseCase } from '@backend/domain/exam/use-cases/exam-year-list-use-case';
import { ExamYearDetailUseCase } from '@backend/domain/exam/use-cases/exam-year-detail-use-case';
import { ExamController } from './controllers/exam.controller';
import { ExamListUseCase } from '@backend/domain/exam/use-cases/exam-list-use-case';
import { MailModule } from '@backend/infra/adapters/email/mailer.module';
import { EducationLevelController } from './controllers/education-level.controller';
import { EducationLevelListUseCase } from '@backend/domain/education-level/use-cases/education-level-list-use-case';
import { UniversityCourseAreaController } from './controllers/university-course-area.controller';
import { UniversityCourseAreaListUseCase } from '@backend/domain/university-course-area/use-cases/university-course-area-list-use-case';
import { ProductRatingController } from './controllers/product-rating.controller';
import { ProductRatingListUseCase } from '@backend/domain/product-rating/use-cases/product-rating-list-use-case';
import { ProductImprovementController } from './controllers/product-improvement.controller';
import { ProductImprovementListUseCase } from '@backend/domain/product-improvement/use-cases/product-improvement-list-use-case';
import { UpdateUserExamYearUseCase } from '@backend/domain/user/use-cases/update-user-exam-year-use-case';
import { CancellationReasonController } from './controllers/cancellation-reason.controller';
import { CancellationReasonListUseCase } from '@backend/domain/cancellation-flow/use-cases/cancellation-reason-list-use-case';
import { MixpanelModule } from '@backend/infra/adapters/mixpanel/mixpanel.module';
import { CancellationController } from './controllers/cancellation.controller';
import { StripeAdapter } from '@backend/infra/adapters/stripe/stripe-adapter';
import { StripeModule } from '@backend/infra/adapters/stripe/stripe.module';
import { CancellationUseCase } from '@backend/domain/cancellation-flow/use-cases/cancellation-use-case';
import { NoteByIdGetUseCase } from '@backend/domain/note/use-cases/note-get-note-by-id-use-case';
import { MixpanelController } from '@backend/infra/http/controllers/mixpanel.controller';
import { GetSubjectByIdUseCase } from '@backend/domain/subject/use-cases/get-subject-by-id-use-case';
import { GetExamBoardByIdUseCase } from '@backend/domain/exam-board/use-cases/get-exam-board-by-id-use-case';
import { GetTopicByIdUseCase } from '@backend/domain/topic/use-cases/get-topic-by-id.use-case';
import { UserStreakUseCase } from '@backend/domain/streak/use-cases/check-user-streak-use-case';
import { UpdateStreakCounterUseCase } from '@backend/domain/streak/use-cases/update-streak-counter-use-case';

@Module({
  imports: [DatabaseModule, MailModule, MixpanelModule, StripeModule],
  controllers: [
    UserProfileController,
    NoteController,
    CountryController,
    ExamYearController,
    ExamController,
    EducationLevelController,
    UniversityCourseAreaController,
    ProductRatingController,
    ProductImprovementController,
    CancellationReasonController,
    CancellationController,
    MixpanelController,
  ],
  providers: [
    LoadUserProfileUseCase,
    UpdateUserProfileUseCase,
    CountryListUseCase,
    ExamYearListUseCase,
    ExamYearDetailUseCase,
    ExamListUseCase,
    CountryListUseCase,
    EducationLevelListUseCase,
    UniversityCourseAreaListUseCase,
    ProductRatingListUseCase,
    ProductImprovementListUseCase,
    UpdateUserExamYearUseCase,
    CancellationReasonListUseCase,
    StripeAdapter,
    CancellationUseCase,
    NoteByIdGetUseCase,
    GetSubjectByIdUseCase,
    GetExamBoardByIdUseCase,
    GetTopicByIdUseCase,
    UserStreakUseCase,
    UpdateStreakCounterUseCase,
  ],
})
export class HttpModule {}
