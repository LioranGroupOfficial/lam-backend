import { IsMongoId, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsMongoId()
  apiId: string;

  @IsMongoId()
  userId: string;

  @IsString()
  content: string;
}
