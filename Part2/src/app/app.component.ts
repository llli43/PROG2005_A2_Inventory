/******************************************************************************
 * Filename: app.component.ts
 * Author: Dongxu Li
 * Student ID:24832300
 * Assignment Module: PROG2005 Assignment 2 - Part 2 (Angular)
 * 
 * Description:
 * Root component of the application. Contains the main navigation bar.
 * All page content is rendered through router-outlet.
 * 
 * Modification History:
 * - 2026-04-07: Initial version created
 ******************************************************************************/

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventory-system';
}
