import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services: any[] =[];
 filteredServices: any[] = this.services;
  activeFilter: string = 'all'; // Default to 'all' to show all services

  filterServices(category: string): void {
    this.activeFilter = category;

    if (category === 'all') {
      this.filteredServices = this.services; // Show all services for 'all' category
    } else {
      this.filteredServices = this.services.filter(service => service.category === category);
    }
  }

  ngOnInit() {
    
  }

}


