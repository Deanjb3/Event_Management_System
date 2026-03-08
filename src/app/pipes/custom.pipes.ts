import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/event.model';

@Pipe({
  name: 'filterByCategory',
  standalone: true
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(events: Event[], category: string): Event[] {
    if (!category) {
      return events;
    }
    return events.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }
}

@Pipe({
  name: 'filterByPrice',
  standalone: true
})
export class FilterByPricePipe implements PipeTransform {
  transform(events: Event[], maxPrice: number): Event[] {
    if (!maxPrice) {
      return events;
    }
    return events.filter(e => e.price <= maxPrice);
  }
}

@Pipe({
  name: 'filterByDate',
  standalone: true
})
export class FilterByDatePipe implements PipeTransform {
  transform(events: Event[], filterDate: string): Event[] {
    if (!filterDate) {
      return events;
    }
    return events.filter(e => e.date >= filterDate);
  }
}

@Pipe({
  name: 'sortByPrice',
  standalone: true
})
export class SortByPricePipe implements PipeTransform {
  transform(events: Event[], ascending: boolean = true): Event[] {
    if (!events) {
      return events;
    }
    const sorted = [...events].sort((a, b) => a.price - b.price);
    return ascending ? sorted : sorted.reverse();
  }
}
