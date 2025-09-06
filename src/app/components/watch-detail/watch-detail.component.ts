import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WatchService } from '../../services/watch.service';
import { Watch } from '../../models/watch.model';

@Component({
  selector: 'app-watch-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="watch" class="container py-5">
      <div class="mb-4">
        <button class="btn btn-outline-secondary" (click)="goBack()">
          <i class="bi bi-arrow-left"></i> Back to Watches
        </button>
      </div>
      <div class="row">
        <div class="col-md-6">
          <img [src]="watch.images[0]" class="img-fluid rounded shadow" [alt]="watch.model" style="max-height:400px;object-fit:contain;">
        </div>
        <div class="col-md-6">
          <h2 class="fw-bold mb-2">{{watch.brand}} {{watch.model}}</h2>
          <h5 class="text-muted mb-3">{{watch.type | titlecase}}</h5>
          <p class="lead mb-3">{{watch.description}}</p>
          <ul class="list-unstyled mb-3">
            <li *ngFor="let feature of watch.features">
              <i class="bi bi-check2"></i> {{feature}}
            </li>
          </ul>
          <div class="mb-3">
            <span class="fw-bold">Price:</span>
            <span class="display-6 text-primary">{{watch.price | currency}}</span>
          </div>
          <div class="mb-3">
            <span class="fw-bold">Stock:</span>
            <span class="text-muted">{{watch.stock}} available</span>
          </div>
          <button type="button" class="btn btn-primary btn-sm" (click)="addToCart()" style="background-color: rgba(231, 96, 6, 1); border-color: rgb(15,17,17);">Add to Cart</button>
        </div>
      </div>
    </div>
  `
})
export class WatchDetailComponent implements OnInit {
  watch: Watch | undefined;

  constructor(private route: ActivatedRoute, private watchService: WatchService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.watchService.getWatchById(id).subscribe(watch => this.watch = watch);
  }

  addToCart(): void {
    // You can implement cart logic here
  }

  goBack(): void {
    window.history.back();
  }
}
