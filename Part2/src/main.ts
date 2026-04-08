/******************************************************************************
 * Filename: main.ts
 * Author: Dongxu Li
 * Student ID:24832300
 * Assignment Module: PROG2005 Assignment 2 - Part 2 (Angular)
 * 
 * Description:
 * Application entry file. Bootstraps and launches the Angular application
 * using standalone component approach.
 * 
 * Modification History:
 * - 2026-04-07: Initial version created
 ******************************************************************************/

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Bootstrap the application
 * Uses AppComponent as the root component
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
