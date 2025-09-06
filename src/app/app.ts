import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from './services/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgbModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('watch-store');
  cartItemCount$ = signal(0);

  constructor(private cartService: CartService) {
    this.cartService.getCart().subscribe(items => {
      const count = items.reduce((total, item) => total + item.quantity, 0);
      this.cartItemCount$.set(count);
    });
  }
}
