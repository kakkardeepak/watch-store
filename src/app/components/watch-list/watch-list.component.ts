import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Watch } from '../../models/watch.model';
import { WatchService } from '../../services/watch.service';
import { CartService } from '../../services/cart.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WatchDetailModalComponent } from '../../components/watch-detail-modal/watch-detail-modal.component';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule, FormsModule],
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {
  watches: Watch[] = [];
  filteredWatches: Watch[] = [];
  uniqueBrands: string[] = [];
  selectedBrands: string[] = [];
  selectedTypes: string[] = [];

  constructor(
    private watchService: WatchService,
    private cartService: CartService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadWatches();
  }

  loadWatches(): void {
    this.watchService.getAllWatches().subscribe(watches => {
      this.watches = watches;
      this.filteredWatches = watches;
      this.uniqueBrands = [...new Set(this.watches.map(watch => watch.brand))];
    });
  }

  applyFilters(): void {
    this.filteredWatches = this.watches.filter(watch => {
      const brandMatch = this.selectedBrands.length === 0 || this.selectedBrands.includes(watch.brand);
      const typeMatch = this.selectedTypes.length === 0 || this.selectedTypes.includes(watch.type);
      return brandMatch && typeMatch;
    });
  }

  // Removed old filterByBrand and filterByType

  sortWatches(event: Event): void {
    const sortBy = (event.target as HTMLSelectElement).value;
    switch (sortBy) {
      case 'price-asc':
        this.watches.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.watches.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        this.watches.sort((a, b) => b.soldCount - a.soldCount);
        break;
    }
  }

  openWatchDetails(watch: Watch): void {
    window.location.href = `/watches/${watch.id}`;
  }

  addToCart(watch: Watch): void {
    this.cartService.addToCart(watch);
  }

  onBrandCheckboxChange(event: Event, brand: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.selectedBrands.includes(brand)) {
        this.selectedBrands.push(brand);
      }
    } else {
      this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    }
    this.applyFilters();
  }

  onTypeCheckboxChange(event: Event, type: string): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.selectedTypes.includes(type)) {
        this.selectedTypes.push(type);
      }
    } else {
      this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    }
    this.applyFilters();
  }
}
