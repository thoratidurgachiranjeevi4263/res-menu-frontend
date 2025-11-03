import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule], // ✅ Enables *ngFor, *ngIf, etc.
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Input() items: any[] = [];  // ✅ Accept items from parent
}


