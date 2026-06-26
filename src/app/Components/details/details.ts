import { Component, inject, ChangeDetectorRef, signal, linkedSignal, resource } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HousingInformation } from '../housing-location/housing-location';
import { Housing } from '../../housing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpperCasePipe, DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, UpperCasePipe, DecimalPipe, DatePipe, CurrencyPipe],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(Housing);
  housingLocation: HousingInformation | undefined;
  changeDetectorRef = inject(ChangeDetectorRef);

  soLuotThich = signal(0);

  thaTim() {
    this.soLuotThich.update(soCu => soCu + 1)
  }
  danhSachQuaTang = signal(['Tivi', 'Tủ lạnh', 'Máy giặt']);

  quaTangChon = linkedSignal(() => this.danhSachQuaTang()[0]);

  khachChonTuLanh() {
    this.quaTangChon.set(this.danhSachQuaTang()[1]);
  }

  khachChonMayGiat() {
    this.quaTangChon.set(this.danhSachQuaTang()[2]);
  }


  chuDauTuDoiQua() { 
    this.danhSachQuaTang.set(['Voucher 2 triệu', 'Gấu bông khổng lồ']);
  }

  thongTinChuNha = resource({
    loader: async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { ten: 'Nguyễn Văn A', sdt: '0123456789' };
    }
  })

  moNoiQuy = signal(false);

  batTatNoiQuy() {
    this.moNoiQuy.update(trangThai => !trangThai);
  }

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

  constructor() {
    const housingId = Number(this.route.snapshot.params['id']);
    this.housingService.getAllHousingLocationsById(housingId).then((nhaLayDuoc) => {
      this.housingLocation = nhaLayDuoc;
      if (nhaLayDuoc) {
        this.soLuotThich.set(nhaLayDuoc.soLuotThich);
      }
      this.changeDetectorRef.detectChanges(); // <--- quan trọng
    });
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }
}
