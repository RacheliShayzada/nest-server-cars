// cars.dto.ts
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CarDto {
  @IsString()
  @IsNotEmpty()
  model: string;  // שם הדגם של הרכב

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]{2,7}$/i, {
    message: 'licensePlate must be alphanumeric and between 2 to 7 characters long',
  })
  licensePlate: string;  // לוחית רישוי של הרכב
}
