import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingInformation } from '../housing-location/housing-location';
import { Housing } from '../../housing';
import { FormControl, FormGroup, ReactiveFormsModule }
  from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(Housing);
  housingLocation: HousingInformation | undefined;
  changeDetectorRef = inject(ChangeDetectorRef);

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

  constructor() {
    const housingId = Number(this.route.snapshot.params['id']);
    this.housingService.getAllHousingLocationsById(housingId).then((nhaLayDuoc) => {
      this.housingLocation = nhaLayDuoc;
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
