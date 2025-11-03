import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item/item.component';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newItem = { name: '', price: 0, category: '' };
  items: any[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe({
      next: (data) => {
        console.log('Loaded items:', data);
        this.items = data;
      },
      error: (err) => console.error('Error loading items:', err)
    });
  }

  addItem() {
    console.log('Add item clicked', this.newItem);
    if (this.newItem.name && this.newItem.price && this.newItem.category) {
      console.log('Validation passed, calling service');
      this.itemService.addItem(this.newItem).subscribe({
        next: (savedItem) => {
          console.log('Item added successfully:', savedItem);
          this.items.push(savedItem);
          this.newItem = { name: '', price: 0, category: '' };
        },
        error: (err) => console.error('Error adding item:', err)
      });
    } else {
      console.log('Validation failed:', this.newItem);
    }
  }

  deleteItem(id: string) {
    console.log('Deleting item with ID:', id);
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        console.log('Item deleted successfully');
        this.items = this.items.filter(item => item._id !== id);
      },
      error: (err) => console.error('Error deleting item:', err)
    });
  }
}

