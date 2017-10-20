import { Pipe, PipeTransform } from '@angular/core';
import { BirthdayDate } from 'app/models/birthday-date';

@Pipe({
  name: 'birthday'
})
export class BirthdayPipe implements PipeTransform {
  transform(birthdayDate: BirthdayDate): string {
    const noData = '--';
    return `${birthdayDate.birthDay || noData}/${birthdayDate.birthMonth || noData}/${birthdayDate.birthYear || noData}`;
  }
}
