export class Quiz {
  constructor(
    public quiz_id: number,
    public title: string,
    public user_id: number,
    public subject_id: number,
    public topic_id: number,
    public examId: number,
    public questionIds: string | null,
    public duration: number,
    public quiz_mode: number,
    public quiz_type: number,
    public question_type: number,
    public code: string,
    public created_on: Date,
    public source_note_id: number | null,
    public sub_topic_id: number | null,
    public questions: Question[],
  ) {}
}
export class Question {
  constructor(
    public quizQuestionsId: number,
    public examId: number,
    public subject_id: number,
    public topicId: number,
    public questionType: number,
    public question: string,
    public options: string,
    public answer: string,
    public answerComment: string | null,
    public createdOn: Date,
    public updatedOn: Date | null,
    public source_note_page_number: number | null,
    public ai_corrections_count: number,
  ) {}
}

export class QuizProgress {
  constructor(
    public id: number,
    public user_id: number,
    public asset_id: number,
    public topic_id: number,
    public total_questions: number,
    public correct_questions: number,
    public correct_questions_ids: string,
    public wrong_questions_ids: string,
    public created_on: Date,
    public updated_on: Date,
  ) {}
}
