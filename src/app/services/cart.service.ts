import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Watch } from '../models/watch.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Load cart from localStorage if available and in browser environment
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        this.cartSubject.next(this.cartItems);
      }
    }
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(watch: Watch, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.watch.id === watch.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ watch, quantity });
    }

    this.updateCart();
  }

  removeFromCart(watchId: number): void {
    this.cartItems = this.cartItems.filter(item => item.watch.id !== watchId);
    this.updateCart();
  }

  updateQuantity(watchId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.watch.id === watchId);
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => 
      total + (item.watch.price * item.quantity), 0
    );
  }

  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }
}
