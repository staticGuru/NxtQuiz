import { IsInt, IsString } from 'class-validator';

export class SubmitQuizDTO {
  @IsInt()
  userId: number;

  @IsString()
  progress: string;
}
