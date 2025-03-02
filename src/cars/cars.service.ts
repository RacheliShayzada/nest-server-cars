import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CarDto } from './dto/Car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) 
    private carRepository: Repository<Car>,
  ) {}

  async getAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async getById(id: number): Promise<Car | null> {
    return this.carRepository.findOne({
      where: { id }, 
    });
  }
  

  async addCar(carDto: CarDto): Promise<Car> {
    const car = this.carRepository.create(carDto);
    return this.carRepository.save(car);
  }

  async updateCar(id: number, updatedCar: CarDto): Promise<Car | null> {
    const car = await this.carRepository.findOne({
      where: { id }, 
    });
  
    if (car) {
      return this.carRepository.save({ ...car, ...updatedCar });
    }
    return null;
  }

  async deleteCar(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}
