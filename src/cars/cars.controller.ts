import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { CarDto } from './dto/Car.dto';

@Controller('cars')
export class CarsController {
    constructor(private utils: CarsService) {}

    @Get()
    async getAll(): Promise<Car[]> {
        try {
            return await this.utils.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Error fetching cars');
        }
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<Car> {
        try {
            const car = await this.utils.getById(id);
            if (!car) {
                throw new NotFoundException(`Car with ID ${id} not found`);
            }
            return car;
        } catch (error) {
            throw new InternalServerErrorException('Error fetching car by ID');
        }
    }

    @Post()
    async addCar(@Body() car: CarDto): Promise<Car> {
        try {
            return await this.utils.addCar(car);
        } catch (error) {
            throw new InternalServerErrorException('Error adding car');
        }
    }

    @Put(':id')
    async updateCar(@Param('id') id: number, @Body() updatedCar: CarDto): Promise<Car> {
        try {
            const updated = await this.utils.updateCar(id, updatedCar);
            if (!updated) {
                throw new NotFoundException(`Car with ID ${id} not found`);
            }
            return updated;
        } catch (error) {
            throw new InternalServerErrorException('Error updating car');
        }
    }

    @Delete(':id')
    async deleteCar(@Param('id') id: number): Promise<void> {
        try {
            await this.utils.deleteCar(id);
        } catch (error) {
            throw new InternalServerErrorException('Error deleting car');
        }
    }
}
