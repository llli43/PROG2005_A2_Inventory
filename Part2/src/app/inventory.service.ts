/******************************************************************************
 * Filename: inventory.service.ts
 * Author: Dongxu Li
 * Student ID:24832300
 * Assignment Module: PROG2005 Assignment 2 - Part 2 (Angular)
 * 
 * Description:
 * Inventory data service. Provides CRUD operations for inventory data.
 * Uses @Injectable decorator for dependency injection, allowing data sharing
 * across multiple components.
 * 
 * Modification History:
 * - 2026-04-07: Initial version created
 ******************************************************************************/

import { Injectable } from '@angular/core';

/**
 * Item Interface - Defines the data structure for inventory items
 * Uses TypeScript interface for type safety
 */
export interface Item {
  id: string;           // Unique identifier
  name: string;         // Item name
  category: string;     // Category: Electronics, Furniture, Clothing, Tools, Miscellaneous
  quantity: number;     // Stock quantity
  price: number;        // Unit price
  supplier: string;     // Supplier name
  stockStatus: string;  // Stock status: "In Stock", "Low Stock", "Out of Stock"
  popularItem: string;  // Is popular: "Yes" or "No"
  comment?: string;     // Comments (optional field)
}

@Injectable({
  providedIn: 'root'  // Singleton service across the entire application
})
export class InventoryService {
  // Internal data storage array
  private items: Item[] = [];

  /**
   * Constructor - Initializes sample data
   */
  constructor() {
    this.loadSampleData();
  }

  /**
   * Load sample data
   * Used for demonstrating system functionality
   */
  private loadSampleData(): void {
    this.items = [
      {
        id: "1001",
        name: "Gaming Laptop",
        category: "Electronics",
        quantity: 15,
        price: 1299.99,
        supplier: "TechSupply Co.",
        stockStatus: "In Stock",
        popularItem: "Yes",
        comment: "High demand"
      },
      {
        id: "1002",
        name: "Office Chair",
        category: "Furniture",
        quantity: 3,
        price: 249.50,
        supplier: "Furniture World",
        stockStatus: "Low Stock",
        popularItem: "No",
        comment: ""
      },
      {
        id: "1003",
        name: "Hammer",
        category: "Tools",
        quantity: 0,
        price: 12.99,
        supplier: "ToolMasters",
        stockStatus: "Out of Stock",
        popularItem: "No"
      }
    ];
  }

  /**
   * Get all items
   * @returns Copy of items array (prevents external modification)
   */
  getItems(): Item[] {
    return [...this.items];
  }

  /**
   * Add new item
   * @param item Item object to add
   * @returns true if added successfully, false if ID already exists
   */
  addItem(item: Item): boolean {
    // Check if ID already exists
    if (this.items.some(i => i.id === item.id)) {
      return false;
    }
    // Add item (create copy to avoid reference issues)
    this.items.push({ ...item });
    return true;
  }

  /**
   * Update item by name
   * @param name Name of item to update (case-insensitive)
   * @param updatedData Fields to update
   * @returns true if updated successfully, false if item not found
   */
  updateItemByName(name: string, updatedData: Partial<Item>): boolean {
    // Find item index
    const index = this.items.findIndex(
      i => i.name.toLowerCase() === name.toLowerCase()
    );
    
    if (index === -1) return false;
    
    // Merge updated data
    this.items[index] = { ...this.items[index], ...updatedData };
    return true;
  }

  /**
   * Delete item by name
   * @param name Name of item to delete
   * @returns true if deleted successfully, false if item not found
   */
  deleteItemByName(name: string): boolean {
    const index = this.items.findIndex(
      i => i.name.toLowerCase() === name.toLowerCase()
    );
    
    if (index === -1) return false;
    
    // Remove from array
    this.items.splice(index, 1);
    return true;
  }

  /**
   * Search items by name
   * @param keyword Search keyword
   * @returns Array of matching items (case-insensitive, partial match)
   */
  searchByName(keyword: string): Item[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.items.filter(
      i => i.name.toLowerCase().includes(lowerKeyword)
    );
  }

  /**
   * Get popular items
   * @returns Array of items marked as popular
   */
  getPopularItems(): Item[] {
    return this.items.filter(i => i.popularItem === "Yes");
  }
}
