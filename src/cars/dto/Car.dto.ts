// cars.dto.ts
import { IsString, IsInt } from 'class-validator';

export class CarDto {
    @IsString()
    model: string;

    @IsInt()
    id: number;

    @IsString()
    licensePlate: string;
}
