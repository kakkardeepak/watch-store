import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Watch } from '../../models/watch.model';
import { WatchService } from '../../services/watch.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <h2>Admin Dashboard</h2>
      
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Inventory Management</h5>
              
              <form [formGroup]="watchForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label class="form-label">Brand</label>
                  <input type="text" class="form-control" formControlName="brand">
                </div>

                <div class="mb-3">
                  <label class="form-label">Model</label>
                  <input type="text" class="form-control" formControlName="model">
                </div>

                <div class="mb-3">
                  <label class="form-label">Type</label>
                  <select class="form-select" formControlName="type">
                    <option value="analog">Analog</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">Price</label>
                  <input type="number" class="form-control" formControlName="price">
                </div>

                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <textarea class="form-control" formControlName="description" rows="3"></textarea>
                </div>

                <div class="mb-3">
                  <label class="form-label">Stock</label>
                  <input type="number" class="form-control" formControlName="stock">
                </div>

                <button type="submit" class="btn btn-primary" [disabled]="watchForm.invalid">
                  Add Watch
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Sales Overview</h5>
              <!-- Add mock sales data visualization here -->
              <div class="mt-3">
                <h6>Total Sales</h6>
                <p class="display-6">$25,420</p>
              </div>
              <div class="mt-3">
                <h6>Popular Watches</h6>
                <ul class="list-unstyled">
                  <li>Rolex Submariner - 12 sold</li>
                  <li>Casio G-Shock - 45 sold</li>
                  <li>Omega Speedmaster - 8 sold</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  watchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private watchService: WatchService
  ) {
    this.watchForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      type: ['analog', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      images: [[]], // In a real app, you'd implement image upload
      features: [[]], // In a real app, you'd have a dynamic form for features
      soldCount: [0]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.watchForm.invalid) return;

    const newWatch: Watch = {
      id: Date.now(), // In a real app, this would be handled by the backend
      ...this.watchForm.value
    };

    // In a real app, you'd send this to your backend
    console.log('New watch:', newWatch);
  }
}
