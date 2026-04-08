/******************************************************************************
 * Filename: home.component.ts
 * Author: Dongxu Li
 * Student ID:24832300
 * Assignment Module: PROG2005 Assignment 2 - Part 2 (Angular)
 * 
 * Description:
 * Home page component. Displays welcome information and navigation
 * to feature pages.
 * 
 * Modification History:
 * - 2026-04-07: Initial version created
 ******************************************************************************/

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { }
