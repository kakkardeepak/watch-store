import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/watch.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Shopping Cart</h2>
      
      <div *ngIf="cartItems.length === 0" class="text-center mt-5">
        <p class="lead">Your cart is empty</p>
        <button class="btn btn-primary" routerLink="/watches">Continue Shopping</button>
      </div>

      <div *ngIf="cartItems.length > 0">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of cartItems">
                <td>
                  <div class="d-flex align-items-center">
                    <img [src]="item.watch.images[0]" [alt]="item.watch.model"
                         style="width: 50px; height: 50px; object-fit: cover"
                         class="me-3">
                    <div>
                      <h6 class="mb-0">{{item.watch.brand}} {{item.watch.model}}</h6>
                      <small class="text-muted">{{item.watch.type}}</small>
                    </div>
                  </div>
                </td>
                <td>\${{item.watch.price.toFixed(2)}}</td>
                <td>
                  <div class="input-group" style="width: 120px">
                    <button class="btn btn-outline-secondary" type="button"
                            (click)="updateQuantity(item, item.quantity - 1)"
                            [disabled]="item.quantity <= 1">-</button>
                    <input type="number" class="form-control text-center"
                           [value]="item.quantity" readonly>
                    <button class="btn btn-outline-secondary" type="button"
                            (click)="updateQuantity(item, item.quantity + 1)"
                            [disabled]="item.quantity >= item.watch.stock">+</button>
                  </div>
                </td>
                <td>\${{(item.watch.price * item.quantity).toFixed(2)}}</td>
                <td>
                  <button class="btn btn-danger btn-sm"
                          (click)="removeFromCart(item.watch.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="row justify-content-end mt-4">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Order Summary</h5>
                <div class="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span>\${{getTotal().toFixed(2)}}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-3">
                  <span class="fw-bold">Total</span>
                  <span class="fw-bold">\${{getTotal().toFixed(2)}}</span>
                </div>
                <button class="btn btn-primary w-100" (click)="proceedToCheckout()">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity > 0 && quantity <= item.watch.stock) {
      this.cartService.updateQuantity(item.watch.id, quantity);
    }
  }

  removeFromCart(watchId: number): void {
    this.cartService.removeFromCart(watchId);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
