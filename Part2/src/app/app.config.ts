/******************************************************************************
 * Filename: app.config.ts
 * Author: Dongxu Li
 * Student ID:24832300
 * Assignment Module: PROG2005 Assignment 2 - Part 2 (Angular)
 * 
 * Description:
 * Application global configuration. Provides router service and other
 * application-level dependencies.
 * 
 * Modification History:
 * - 2026-04-07: Initial version created
 ******************************************************************************/

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Application configuration object
 * Uses provideRouter to enable routing functionality
 */
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
