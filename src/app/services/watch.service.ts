import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Watch } from '../models/watch.model';

@Injectable({
  providedIn: 'root'
})
export class WatchService {
  private watches: Watch[] = [];

  constructor(private http: HttpClient) {}

  getAllWatches(): Observable<Watch[]> {
    return this.http.get<{ watches: Watch[] }>('/assets/mock-data/watches.json').pipe(
      map(response => response.watches)
    );
  }

  getLatestWatches(count: number = 5): Observable<Watch[]> {
    return this.getAllWatches().pipe(
      map(watches => watches.slice(0, count))
    );
  }

  getMostSoldWatches(count: number = 5): Observable<Watch[]> {
    return this.http.get<{ watches: Watch[] }>('/assets/mock-data/watches.json').pipe(
      map(response => 
        response.watches
          .sort((a, b) => b.soldCount - a.soldCount)
          .slice(0, count)
      )
    );
  }

  getWatchById(id: number): Observable<Watch | undefined> {
    return this.http.get<{ watches: Watch[] }>('/assets/mock-data/watches.json').pipe(
      map(response => response.watches.find(watch => watch.id === id))
    );
  }

  filterWatches(brand?: string, priceRange?: { min: number; max: number }, type?: string): Observable<Watch[]> {
    return this.http.get<{ watches: Watch[] }>('assets/mock-data/watches.json').pipe(
      map(response => {
        let filteredWatches = response.watches;

        if (brand) {
          filteredWatches = filteredWatches.filter(watch => 
            watch.brand.toLowerCase().includes(brand.toLowerCase())
          );
        }

        if (priceRange) {
          filteredWatches = filteredWatches.filter(watch => 
            watch.price >= priceRange.min && watch.price <= priceRange.max
          );
        }

        if (type) {
          filteredWatches = filteredWatches.filter(watch => 
            watch.type === type
          );
        }

        return filteredWatches;
      })
    );
  }
}
