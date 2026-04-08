/******************************************************************************
 * Filename: search.component.ts
 * Author: Dongxu Li
 * Assignment Module: PROG2005 Assignment 2 - Part 2 (Angular)
 * 
 * Description:
 * Search page component. Provides functionality to search inventory items by name.
 * Supports fuzzy search and displays search results.
 * 
 * Modification History:
 * - 2026-04-07: Initial version created
 ******************************************************************************/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, Item } from '../inventory.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  // Search keyword
  keyword: string = '';
  
  // Search results list
  results: Item[] = [];
  
  // Message feedback
  message: string = '';

  /**
   * Constructor - Injects InventoryService
   * @param inventoryService Inventory data service
   */
  constructor(private inventoryService: InventoryService) {}

  /**
   * Execute search
   * Searches items by name (case-insensitive, partial match)
   */
  search(): void {
    const kw = this.keyword.trim();
    
    if (!kw) {
      this.message = 'Please enter a search keyword.';
      this.results = [];
      return;
    }
    
    this.results = this.inventoryService.searchByName(kw);
    
    if (this.results.length === 0) {
      this.message = `No items found containing "${kw}".`;
    } else {
      this.message = `Found ${this.results.length} item(s).`;
    }
  }

  /**
   * Clear search
   */
  clearSearch(): void {
    this.keyword = '';
    this.results = [];
    this.message = '';
  }
}
