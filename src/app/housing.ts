import { Injectable } from '@angular/core';
import { HousingInformation } from './Components/housing-location/housing-location';
import id from '@angular/common/locales/id';

@Injectable({
  providedIn: 'root',
})
export class Housing {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<HousingInformation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getAllHousingLocationsById(id: number): Promise<HousingInformation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? undefined;
  }


  submitApplication(firstName: string, lastName: string, email: string): void {
    console.log(
      `Homes application received:\n  First name: ${firstName}\n  Last name: ${lastName}\n  Email: ${email}`
    );
    alert(
      `Đăng ký thành công cho ${firstName} ${lastName}!\nMở Console (F12) để xem dữ liệu.`
    );
  }
}
