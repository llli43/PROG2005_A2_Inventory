/******************************************************************************
 * Filename: inventory.component.ts
 * Author: Dongxu Li
 * Student ID:24832300
 * Assignment Module: PROG2005 Assignment 2 - Part 2 (Angular)
 * 
 * Description:
 * Inventory management page component. Provides CRUD operations for items.
 * Includes adding new items, updating existing items, deleting items,
 * and viewing inventory list.
 * 
 * Technical Implementation:
 * - Uses InventoryService for data operations
 * - Uses two-way data binding (ngModel) for forms
 * - Uses TypeScript strong typing
 * - Implements form validation and error handling
 * 
 * Modification History:
 * - 2026-04-07: Initial version created
 ******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, Item } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  
  /**
   * Form data model
   * Binds to add/edit form
   * Contains all fields for an item
   */
  formData: Item = {
    id: '',                          // Unique identifier
    name: '',                        // Item name
    category: 'Electronics',         // Category (default: Electronics)
    quantity: 0,                     // Stock quantity
    price: 0,                        // Unit price
    supplier: '',                    // Supplier name
    stockStatus: 'In Stock',         // Stock status (default: In Stock)
    popularItem: 'No',               // Is popular (default: No)
    comment: ''                      // Comments (optional)
  };

  /** Item name input for delete form */
  deleteName: string = '';
  
  /** Current displayed items list (table data source) */
  displayItems: Item[] = [];
  
  /** Operation message feedback */
  message: string = '';

  /**
   * Constructor - Injects InventoryService
   * @param inventoryService Inventory data service
   */
  constructor(private inventoryService: InventoryService) {}

  /**
   * Component initialization lifecycle hook
   * Automatically called when component loads
   */
  ngOnInit(): void {
    this.showAllItems();
  }

  /**
   * Display operation message
   * Auto-clears after 3 seconds
   */
  private showMessage(msg: string, isError: boolean = false): void {
    this.message = msg;
    setTimeout(() => { this.message = ''; }, 3000);
  }

  /**
   * Reset form to initial state
   */
  private resetForm(): void {
    this.formData = {
      id: '',
      name: '',
      category: 'Electronics',
      quantity: 0,
      price: 0,
      supplier: '',
      stockStatus: 'In Stock',
      popularItem: 'No',
      comment: ''
    };
  }

  /**
   * Add new item
   * Validates data then calls service to add
   */
  addItem(): void {
    const { id, name, supplier, quantity, price } = this.formData;
    
    // Validate required fields
    if (!id || !name || !supplier) {
      this.showMessage('ID, Name, and Supplier are required.', true);
      return;
    }
    
    // Validate numeric fields
    if (quantity < 0 || isNaN(quantity) || price < 0 || isNaN(price)) {
      this.showMessage('Quantity and Price must be non-negative numbers.', true);
      return;
    }
    
    // Call service to add item
    const success = this.inventoryService.addItem({ ...this.formData });
    
    if (success) {
      this.showMessage(`Item "${name}" added successfully.`);
      this.resetForm();
      this.showAllItems();
    } else {
      this.showMessage(`ID "${id}" already exists. Use a unique ID.`, true);
    }
  }

  /**
   * Update existing item
   * Finds item by name and updates other fields
   */
  updateItem(): void {
    const targetName = this.formData.name.trim();
    
    if (!targetName) {
      this.showMessage('Please enter the Item Name to update.', true);
      return;
    }
    
    const { id, supplier, quantity, price, category, stockStatus, popularItem, comment } = this.formData;
    
    // Validate required fields
    if (!id || !supplier) {
      this.showMessage('ID and Supplier are required for update.', true);
      return;
    }
    
    // Validate numeric fields
    if (quantity < 0 || isNaN(quantity) || price < 0 || isNaN(price)) {
      this.showMessage('Quantity and Price must be valid numbers >= 0.', true);
      return;
    }
    
    // Check if ID is used by another item
    const currentItems = this.inventoryService.getItems();
    const existing = currentItems.find(i => i.id === id && i.name.toLowerCase() !== targetName.toLowerCase());
    
    if (existing) {
      this.showMessage(`ID "${id}" is already used by another item.`, true);
      return;
    }
    
    // Prepare update data
    const updatedData: Partial<Item> = { id, category, quantity, price, supplier, stockStatus, popularItem, comment };
    const success = this.inventoryService.updateItemByName(targetName, updatedData);
    
    if (success) {
      this.showMessage(`Item "${targetName}" updated successfully.`);
      this.resetForm();
      this.showAllItems();
    } else {
      this.showMessage(`No item found with name "${targetName}".`, true);
    }
  }

  /**
   * Delete item
   * Shows confirmation dialog to prevent accidental deletion
   */
  deleteItem(): void {
    const name = this.deleteName.trim();
    
    if (!name) {
      this.showMessage('Please enter the Item Name to delete.', true);
      return;
    }
    
    // Show confirmation dialog
    const confirmMsg = `Are you sure you want to delete "${name}"?`;
    if (confirm(confirmMsg)) {
      const success = this.inventoryService.deleteItemByName(name);
      
      if (success) {
        this.showMessage(`Item "${name}" deleted.`);
        this.deleteName = '';
        this.showAllItems();
      } else {
        this.showMessage(`No item found with name "${name}".`, true);
      }
    } else {
      this.showMessage('Deletion cancelled.');
    }
  }

  /**
   * Display all items
   */
  showAllItems(): void {
    this.displayItems = this.inventoryService.getItems();
    this.showMessage(`Showing all ${this.displayItems.length} items.`);
  }

  /**
   * Display popular items
   */
  showPopularItems(): void {
    this.displayItems = this.inventoryService.getPopularItems();
    
    if (this.displayItems.length === 0) {
      this.showMessage('No popular items marked.');
    } else {
      this.showMessage(`Showing ${this.displayItems.length} popular item(s).`);
    }
  }
}
