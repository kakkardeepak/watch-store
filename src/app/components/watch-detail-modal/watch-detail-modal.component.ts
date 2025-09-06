import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbCarousel, NgbSlide, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Watch } from '../../models/watch.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-watch-detail-modal',
  standalone: true,
  imports: [CommonModule, NgbModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{watch.brand}} {{watch.model}}</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      <ngb-carousel class="mb-4">
        <ng-template ngbSlide *ngFor="let image of watch.images">
          <img [src]="image" class="d-block w-100" [alt]="watch.model"
               style="height: 400px; object-fit: contain;">
        </ng-template>
      </ngb-carousel>

      <div class="details mt-4">
        <h5>Description</h5>
        <p>{{watch.description}}</p>

        <h5>Features</h5>
        <ul class="list-unstyled">
          <li *ngFor="let feature of watch.features">
            <i class="bi bi-check2"></i> {{feature}}
          </li>
        </ul>

        <div class="d-flex justify-content-between align-items-center mt-4">
          <div>
            <h5 class="mb-0">Price</h5>
            <p class="display-6">\${{watch.price.toFixed(2)}}</p>
          </div>
          <div>
            <h5 class="mb-0">Stock</h5>
            <p class="text-muted">{{watch.stock}} available</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Close</button>
      <button type="button" class="btn btn-primary" (click)="addToCart()">Add to Cart</button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .modal-body {
      max-height: 80vh;
      overflow-y: auto;
    }
  `]
})
export class WatchDetailModalComponent {
  @Input() watch!: Watch;

  constructor(
    public activeModal: NgbActiveModal,
    private cartService: CartService
  ) {}

  addToCart(): void {
    this.cartService.addToCart(this.watch);
    this.activeModal.close();
  }
}
