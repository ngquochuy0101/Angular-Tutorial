import { Housing } from '../../housing';
import {RouterLink } from '@angular/router';
import { ChangeDetectorRef, Component, inject } from '@angular/core';

@Component({
  selector: 'app-housing-location',
  imports: [RouterLink],
  templateUrl: './housing-location.html',
  styleUrl: './housing-location.css',
})
export class HousingLocation {
  // 1. Tiêm Service vào (phải import inject và Housing)
  housingService: Housing = inject(Housing);
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  // 2. Khai báo mảng gốc để chứa dữ liệu từ Service
  housingInformationList: HousingInformation[] = [];
  // Mảng phụ để hiển thị ra màn hình
  filteredLocationList: HousingInformation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingInformationList) => {
      this.housingInformationList = housingInformationList;
      this.filteredLocationList = housingInformationList;
      // 3. GọidetectChanges() sau khi dữ liệu đã được cập nhật
      this.changeDetectorRef.detectChanges();
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingInformationList;
      return;
    }
    this.filteredLocationList = this.housingInformationList.filter(house =>
      house.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
export interface HousingInformation {
  id: number;
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}