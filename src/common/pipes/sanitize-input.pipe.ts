import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as sanitize from 'sanitize-html';

@Injectable()
export class SanitizeInputPipe implements PipeTransform {
  transform(value: any) {
    if (value && typeof value === 'object') {
      // עבור כל שדה באובייקט, אם הוא מחרוזת - ננקה אותו
      Object.keys(value).forEach(key => {
        if (typeof value[key] === 'string') {
          value[key] = sanitize(value[key]);  // מנקה את הערך
        } else if (typeof value[key] === 'object' && value[key] !== null) {
          // אם השדה הוא אובייקט, ניתן גם לעבור עליו בצורה רקורסיבית
          value[key] = this.sanitizeObject(value[key]);
        }
      });
    }

    return value;
  }

  // פונקציה רקורסיבית שתעבור על אובייקטים בתוך אובייקטים
  private sanitizeObject(obj: any) {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string') {
          obj[key] = sanitize(obj[key]);  // מנקה את הערך
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          obj[key] = this.sanitizeObject(obj[key]);
        }
      });
    }
    return obj;
  }
}
