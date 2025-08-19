import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule]
})
export class ProductsComponent implements OnInit {
// Removed duplicate onSearchInput() implementation

 selectedFilter = 'other'; 
  // selectedFilter: string = 'all';

  rooms: any[] = [];
  filteredRooms: any[] = [];
  searchTerm: string = '';
  // selectedFilter: string = 'all';
  sortOption: string = '';
  isLoading: boolean = true;

  private searchTimeout: any;

  constructor(private http: HttpClient, private router: Router) {}

  

   selected: 'none' | 'available' | 'booked' = 'none';

  select(status: 'available' | 'booked') {
    this.selected = status;
    this.selectedFilter = status; }

  

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.isLoading = true;
    this.http.get<any[]>('https://db-json-9gqz.onrender.com/Rooms')
      .subscribe({
        next: (data) => { 
          this.rooms = data;
          this.filteredRooms = [...this.rooms];
          this.applySorting();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching rooms:', error);
          this.isLoading = false;
        }
      });
  }

  filterRooms() {
    let filtered = [...this.rooms];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(room =>
        room.name?.toLowerCase().includes(term) ||
        room.type?.toLowerCase().includes(term) ||
        room.size?.toLowerCase().includes(term) ||
        room.location?.toLowerCase().includes(term) ||
        room.description?.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (this.selectedFilter !== 'all') {
      switch (this.selectedFilter) {
        case 'available':
          filtered = filtered.filter(room => room.isAvailable === true);
          break;
        case 'booked':
          filtered = filtered.filter(room => room.isAvailable === false);
          break;
        case '1BHK':
          filtered = filtered.filter(room =>
            room.type?.includes('1BHK') || room.type?.includes('1 BHK')
          );
          break;
        case '2BHK':
          filtered = filtered.filter(room =>
            room.type?.includes('2BHK') || room.type?.includes('2 BHK')
          );
          break;
        case '3BHK':
          filtered = filtered.filter(room =>
            room.type?.includes('3BHK') || room.type?.includes('3 BHK')
          );
          break;
        case 'shared':
          filtered = filtered.filter(room =>
            room.type?.toLowerCase().includes('shared') ||
            room.type?.toLowerCase().includes('sharing')
          );
          break;
        default:
          filtered = filtered.filter(room => room.type?.includes(this.selectedFilter));
      }
    }

    this.filteredRooms = filtered;
    this.applySorting();
  }

  

  setFilter(filter: string) {
    this.selectedFilter = filter;
    console.log(`Filter set to: ${filter}`);
    
    // this.currentPage = 1;
    this.filterRooms();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedFilter = 'all';
    this.filteredRooms = [...this.rooms];
    this.applySorting();
  }

  onSearchInput() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.filterRooms();
    }, 300);
  }

  trackByRoomId(index: number, room: any): any {
    return room.id || index;
  }

  goToDetails(id: number) {
    this.router.navigate(['/room', id]);
  }

  getUniqueRoomTypes(): string[] {
    const types = this.rooms.map(room => room.type).filter(Boolean);
    return [...new Set(types)];
  }

  formatPrice(room: any): string {
    if (room.priceDetails?.monthly) {
      return `₹${room.priceDetails.monthly}`;
    } else if (room.price) {
      return `₹${room.price}`;
    }
    return 'Price on request';
  }

  getAvailableCount(): number {
    return this.rooms.filter(room => room.isAvailable === true).length;
  }

  getBookedCount(): number {
    return this.rooms.filter(room => room.isAvailable === false).length;
  }

  // New: Handle sort select change event
  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortOption = value;
    this.applySorting();
  }

  // Use this method to apply sorting on filteredRooms
  applySorting() {
    switch (this.sortOption) {
      case 'name':
        this.filteredRooms.sort((a, b) => a.name?.localeCompare(b.name) || 0);
        break;
      case 'price-low':
        this.filteredRooms.sort((a, b) => {
          const priceA = a.priceDetails?.monthly || a.price || 0;
          const priceB = b.priceDetails?.monthly || b.price || 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        this.filteredRooms.sort((a, b) => {
          const priceA = a.priceDetails?.monthly || a.price || 0;
          const priceB = b.priceDetails?.monthly || b.price || 0;
          return priceB - priceA;
        });
        break;
      case 'availability':
        this.filteredRooms.sort((a, b) => {
          if (a.isAvailable && !b.isAvailable) return -1;
          if (!a.isAvailable && b.isAvailable) return 1;
          return 0;
        });
        break;
      default:
        // No sorting or default order
        break;
    }
    this.updatePagination();
  }

  refreshRooms() {
    this.loadRooms();
  }

  // Pagination variables
currentPage: number = 1;
pageSize: number = 9;  // Change this to how many rooms per page you want
totalPages: number = 1;

// This array will hold only rooms of the current page to show
pagedRooms: any[] = [];

// Call this after filtering or sorting
updatePagination() {
  this.totalPages = Math.ceil(this.filteredRooms.length / this.pageSize);
  this.updatePagedRooms();
}

// Update pagedRooms based on currentPage
updatePagedRooms() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.pagedRooms = this.filteredRooms.slice(startIndex, endIndex);
}

// Call this to go to specific page
goToPage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.updatePagedRooms();
}

// Previous page
prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePagedRooms();
  }
}

// Next page
nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePagedRooms();
  }
}

// Modify these methods to update pagination after filtering/sorting:
/* Duplicate filterRooms() implementation removed */


}


