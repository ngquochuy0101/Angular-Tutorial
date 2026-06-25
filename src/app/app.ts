import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HousingLocation } from './Components/housing-location/housing-location';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HousingLocation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('my-first-app');
  
}
