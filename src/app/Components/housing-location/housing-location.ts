import { Housing } from '../../housing';
import {RouterLink} from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal, effect } from '@angular/core';

@Component({
  selector: 'app-housing-location',
  imports: [RouterLink, UpperCasePipe],
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

  tuKhoa = signal('');
  hienThongBao = signal(true);

  batTatThongBao(){
    this.hienThongBao.update(trangThai => !trangThai);
  }

  constructor() {
    // Tính năng mới: Tự động tắt quảng cáo sau 2 giây khi mới vào web
    setTimeout(() => {
      this.hienThongBao.set(false);
    }, 2000);

    this.housingService.getAllHousingLocations().then((housingInformationList) => {
      this.housingInformationList = housingInformationList;
      this.filteredLocationList = housingInformationList;
      // 3. GọidetectChanges() sau khi dữ liệu đã được cập nhật
      this.changeDetectorRef.detectChanges();
    });

    // Tạo độ trễ (debounced) bằng kỹ thuật dọn dẹp (onCleanup) của effect
    effect((onCleanup) => {
      // 1. Lấy từ khóa người dùng đang gõ
      const tuKhoaHienTai = this.tuKhoa();
      
      // 2. Cài đặt hẹn giờ 300ms sau mới bắt đầu tìm
      const timer = setTimeout(() => {
        this.filterResults(tuKhoaHienTai);
      }, 100);

      // 3. Nếu người dùng gõ tiếp chữ mới khi chưa hết 300ms, hủy cái hẹn giờ cũ đi!
      onCleanup(() => {
        clearTimeout(timer);
      });
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
  diemDanhGia: number;
  ngayMoBan: string;
  giaThue: number;
  soLuotThich: number;
}