import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNoteRepository } from './prisma/repositories/prisma-note.repository';
import { NoteRepository } from '@backend/domain/note/repositories/note-repository';
import { PrismaAuthSessionsRepository } from './prisma/repositories/prisma-auth-session.repository';
import { AuthSessionRepository } from '@backend/domain/user/repositories/auth-session-repository';
import { UsersRepository } from '@backend/domain/user/repositories/user-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-user.repository';
import { CountryRepository } from '@backend/domain/country/repositories/country-repository';
import { PrismaCountryRepository } from './prisma/repositories/prisma-country.repository';
import { ExamYearRepository } from '@backend/domain/exam/repositories/exam-year-repository';
import { PrismaExamYearRepository } from './prisma/repositories/prisma-exam-year.repository';
import { ExamRepository } from '@backend/domain/exam/repositories/exam-repository';
import { PrismaExamRepository } from './prisma/repositories/prisma-exam-repository';
import { ProfileDetailsRepository } from '@backend/domain/user/repositories/profile-details-repository';
import { PrismaProfileDetailsRepository } from './prisma/repositories/prisma-profile-details.repository';
import { SubjectRepository } from '@backend/domain/subject/repositories/subject-repository';
import { PrismaSubjectRepository } from './prisma/repositories/prisma-subject.repository';
import { PrismaEmailTemplateRepository } from './prisma/repositories/prisma-email-template.repository';
import { EmailTemplateRepository } from '@backend/domain/email-template/repositories/email-template-repository';
import { EducationLevelRepository } from '@backend/domain/education-level/repositories/education-level-repository';
import { PrismaEducationLevelRepository } from './prisma/repositories/prisma-education-level.repository';
import { UniversityCourseAreaRepository } from '@backend/domain/university-course-area/repositories/university-course-area-repository';
import { PrismaUniversityCourseAreaRepository } from './prisma/repositories/prisma-university-course-area.repository';
import { ProductRatingRepository } from '@backend/domain/product-rating/repositories/product-rating-repository';
import { PrismaProductRatingRepository } from './prisma/repositories/prisma-product-rating.repository';
import { ProductImprovementRepository } from '@backend/domain/product-improvement/repositories/product-improvement-repository';
import { PrismaProductImprovementRepository } from './prisma/repositories/prisma-product-improvement.repository';
import { CancellationReasonRepository } from '@backend/domain/cancellation-flow/repositories/cancellation-reason-repository';
import { PrismaCancellationReasonRepository } from './prisma/repositories/prisma-cancellation-reason.repository';
import { EventTrackingRepository } from '@backend/domain/event-tracking/repositories/event-tracking-repository';
import { PrismaEventTrackingRepository } from './prisma/repositories/prisma-event-tracking.repositoy';
import { UserPlanRepository } from '@backend/domain/user-plan/repositories/user-plan-repository';
import { PrismaUserPlanRepository } from './prisma/repositories/prisma-user-plan-repository';
import { MembershipRepository } from '@backend/domain/membership/repositories/membership-repository';
import { PrismaMembershipRepository } from './prisma/repositories/prisma-membership.repository';
import { CancellationRepository } from '@backend/domain/cancellation-flow/repositories/cancellation-repository';
import { PrismaCancellationRepository } from './prisma/repositories/prisma-cancellation.repository';
import { ExamBoardRepository } from '@backend/domain/exam-board/repositories/exam-board-repository';
import { PrismaExamBoardRepository } from './prisma/repositories/prisma-exam-board.repository';
import { TopicRepository } from '@backend/domain/topic/repositories/topic-repository';
import { PrismaTopicRepository } from './prisma/repositories/prisma-topic-repository';
import { UserStreakRepository } from '@backend/domain/streak/repositories/user-streak-repository';
import { PrismaUserStreakRepository } from './prisma/repositories/prisma-user-streak-repository';
import { PrismaQuizRepository } from './prisma/repositories/prisma-quiz.repository';
import { QuizRepository } from '@backend/domain/quiz/repositories/quiz-repository';
import { PrismaQuizProgressRepository } from './prisma/repositories/prisma-quiz-progress.repository';
import { QuizProgressRepository } from '@backend/domain/quiz/repositories/quiz-progress-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NoteRepository,
      useClass: PrismaNoteRepository,
    },
    {
      provide: AuthSessionRepository,
      useClass: PrismaAuthSessionsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ProfileDetailsRepository,
      useClass: PrismaProfileDetailsRepository,
    },
    {
      provide: CountryRepository,
      useClass: PrismaCountryRepository,
    },
    {
      provide: ExamYearRepository,
      useClass: PrismaExamYearRepository,
    },
    {
      provide: EventTrackingRepository,
      useClass: PrismaEventTrackingRepository,
    },
    {
      provide: ExamRepository,
      useClass: PrismaExamRepository,
    },
    {
      provide: SubjectRepository,
      useClass: PrismaSubjectRepository,
    },
    {
      provide: EmailTemplateRepository,
      useClass: PrismaEmailTemplateRepository,
    },
    {
      provide: EducationLevelRepository,
      useClass: PrismaEducationLevelRepository,
    },
    {
      provide: UniversityCourseAreaRepository,
      useClass: PrismaUniversityCourseAreaRepository,
    },
    {
      provide: ProductRatingRepository,
      useClass: PrismaProductRatingRepository,
    },
    {
      provide: ProductImprovementRepository,
      useClass: PrismaProductImprovementRepository,
    },
    {
      provide: CancellationReasonRepository,
      useClass: PrismaCancellationReasonRepository,
    },
    {
      provide: UserPlanRepository,
      useClass: PrismaUserPlanRepository,
    },
    {
      provide: MembershipRepository,
      useClass: PrismaMembershipRepository,
    },
    {
      provide: CancellationRepository,
      useClass: PrismaCancellationRepository,
    },
    {
      provide: ExamBoardRepository,
      useClass: PrismaExamBoardRepository,
    },
    {
      provide: TopicRepository,
      useClass: PrismaTopicRepository,
    },
    {
      provide: UserStreakRepository,
      useClass: PrismaUserStreakRepository,
    },
    {
      provide: QuizRepository,
      useClass: PrismaQuizRepository,
    },
    {
      provide: QuizProgressRepository,
      useClass: PrismaQuizProgressRepository,
    },
  ],
  exports: [
    PrismaService,
    AuthSessionRepository,
    NoteRepository,
    QuizRepository,
    QuizProgressRepository,
    UsersRepository,
    CountryRepository,
    ExamYearRepository,
    ExamRepository,
    ProfileDetailsRepository,
    SubjectRepository,
    EmailTemplateRepository,
    EducationLevelRepository,
    UniversityCourseAreaRepository,
    ProductRatingRepository,
    ProductImprovementRepository,
    CancellationReasonRepository,
    EventTrackingRepository,
    UserPlanRepository,
    MembershipRepository,
    CancellationRepository,
    ExamBoardRepository,
    TopicRepository,
    UserStreakRepository,
  ],
})
export class DatabaseModule {}
