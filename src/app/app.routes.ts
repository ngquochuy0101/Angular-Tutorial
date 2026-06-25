import { Routes } from '@angular/router';
import { HousingLocation } from './Components/housing-location/housing-location';
import { Details } from './Components/details/details';


export const routes: Routes = [
    {
        path: '',
        component: HousingLocation,
        title: 'Home'
    },
    {
        path: 'details/:id',
        component: Details,
        title: 'Details'
    }
];
