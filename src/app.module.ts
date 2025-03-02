import { Module } from '@nestjs/common';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './cars/entities/car.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'mana.cjo4y2jzzy7c.il-central-1.rds.amazonaws.com',  // כתובת השרת של ה-DB
      port: 5432,         // פורט ברירת המחדל של PostgreSQL
      username: 'manaadmin',  // שם המשתמש שלך ב-PostgreSQL
      password: '',  // סיסמא שלך ב-PostgreSQL
      database: 'postgres',  // שם הדאטהבייס שלך
      entities: [Car],  // כאן נרשום את כל ה-entities שלנו
      synchronize: true, // אוטומטית ייצור את הטבלאות אם הן לא קיימות (לא מומלץ בסביבות פרודקשן)
      schema: 'tests', // כאן תגדיר את הסכמה בשם TEST
    }),
    TypeOrmModule.forFeature([Car]),  // כאן אנו מוסיפים את המודל שלנו
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class AppModule {}
