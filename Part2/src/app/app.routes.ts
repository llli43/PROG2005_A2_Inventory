/******************************************************************************
 * Filename: app.routes.ts
 * Author: Dongxu Li
 * Student ID:24832300
 * Assignment Module: PROG2005 Assignment 2 - Part 2 (Angular)
 * 
 * Description:
 * Application routing configuration. Defines URL paths and corresponding
 * components for each page. Implements multi-page navigation.
 * 
 * Modification History:
 * - 2026-04-07: Initial version created
 ******************************************************************************/

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SearchComponent } from './search/search.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HelpComponent } from './help/help.component';

/**
 * Route configuration array
 * Defines the component for each path
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },              // Home page
  { path: 'inventory', component: InventoryComponent }, // Inventory management page
  { path: 'search', component: SearchComponent },       // Search page
  { path: 'privacy', component: PrivacyComponent },     // Privacy page
  { path: 'help', component: HelpComponent },           // Help page
  { path: '**', redirectTo: '' }                        // 404 redirect to home
];
