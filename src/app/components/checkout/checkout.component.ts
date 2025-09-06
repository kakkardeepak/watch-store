import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <h2>Checkout</h2>

      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-4">Billing Details</h5>
              
              <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-control" formControlName="firstName">
                    <div class="invalid-feedback" *ngIf="checkoutForm.get('firstName')?.errors?.['required']">
                      First name is required
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-control" formControlName="lastName">
                    <div class="invalid-feedback" *ngIf="checkoutForm.get('lastName')?.errors?.['required']">
                      Last name is required
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" formControlName="email">
                  <div class="invalid-feedback" *ngIf="checkoutForm.get('email')?.errors?.['required']">
                    Email is required
                  </div>
                  <div class="invalid-feedback" *ngIf="checkoutForm.get('email')?.errors?.['email']">
                    Please enter a valid email
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Address</label>
                  <input type="text" class="form-control" formControlName="address">
                  <div class="invalid-feedback" *ngIf="checkoutForm.get('address')?.errors?.['required']">
                    Address is required
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">City</label>
                    <input type="text" class="form-control" formControlName="city">
                    <div class="invalid-feedback" *ngIf="checkoutForm.get('city')?.errors?.['required']">
                      City is required
                    </div>
                  </div>

                  <div class="col-md-3 mb-3">
                    <label class="form-label">State</label>
                    <input type="text" class="form-control" formControlName="state">
                    <div class="invalid-feedback" *ngIf="checkoutForm.get('state')?.errors?.['required']">
                      State is required
                    </div>
                  </div>

                  <div class="col-md-3 mb-3">
                    <label class="form-label">ZIP Code</label>
                    <input type="text" class="form-control" formControlName="zip">
                    <div class="invalid-feedback" *ngIf="checkoutForm.get('zip')?.errors?.['required']">
                      ZIP code is required
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Card Information</label>
                  <div id="card-element" class="form-control"></div>
                  <div id="card-errors" class="invalid-feedback"></div>
                </div>

                <button type="submit" class="btn btn-primary"
                        [disabled]="checkoutForm.invalid || processing">
                  {{ processing ? 'Processing...' : 'Place Order' }}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Order Summary</h5>
              <div class="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>\${{total.toFixed(2)}}</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between">
                <span class="fw-bold">Total</span>
                <span class="fw-bold">\${{total.toFixed(2)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  stripe: any;
  card: any;
  processing = false;
  total = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService
  ) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.total = this.cartService.getTotal();
    
    // Initialize Stripe
    this.stripe = await loadStripe('your_publishable_key'); // Replace with your Stripe publishable key
    const elements = this.stripe.elements();
    
    // Create card element
    this.card = elements.create('card');
    this.card.mount('#card-element');

    // Handle card errors
    this.card.addEventListener('change', (event: any) => {
      const displayError = document.getElementById('card-errors');
      if (displayError) {
        displayError.textContent = event.error ? event.error.message : '';
      }
    });
  }

  async onSubmit() {
    if (this.checkoutForm.invalid) return;

    this.processing = true;

    try {
      // Create payment method
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.card,
        billing_details: {
          name: `${this.checkoutForm.get('firstName')?.value} ${this.checkoutForm.get('lastName')?.value}`,
          email: this.checkoutForm.get('email')?.value,
          address: {
            line1: this.checkoutForm.get('address')?.value,
            city: this.checkoutForm.get('city')?.value,
            state: this.checkoutForm.get('state')?.value,
            postal_code: this.checkoutForm.get('zip')?.value
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Here you would typically send the paymentMethod.id to your backend
      // to complete the payment
      console.log('Payment successful:', paymentMethod);
      
      // Clear cart and redirect to success page
      this.cartService.clearCart();
      // this.router.navigate(['/order-success']);
      
    } catch (err: any) {
      console.error('Payment failed:', err);
      const errorElement = document.getElementById('card-errors');
      if (errorElement) {
        errorElement.textContent = err.message;
      }
    }

    this.processing = false;
  }
}
