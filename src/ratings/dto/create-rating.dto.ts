import { IsMongoId, IsNumber, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsMongoId()
  apiId: string;

  @IsMongoId()
  userId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
