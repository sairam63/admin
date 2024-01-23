import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
// your-component.component.ts
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

  export class HomeComponent implements OnInit {
    private scrollDots = ['dot1', 'dot2', 'dot3'];
    private scrollingTexts = ['Your Text Here 1', 'Your Text Here 2', 'Your Text Here 3'];
    private descriptions = [
    'Some additional information or description 1.',
    'Some additional information or description 2.',
    'Some additional information or description 3.'
   ];

   testimonials = [
    { text: 'Grateful for the convenience and compassion of the home care service. The personalized attention from the visiting doctor made my recovery at home a seamless and positive experience.', author: 'Prakash N', location: 'Banglore', image: 'assets/100.png' },
    { text: 'Booking a doctor for a home visit was a game-changer. The personalized care and professional service exceeded my expectations, making my recovery comfortable and stress-free.', author: 'Indumati S', location: 'Banglore', image: 'assets/200.png' },
    // Add more testimonials as needed
  ];

   // Set the number of testimonials to display at a time
   testimonialsPerSlide = 2;

   // Initialize the activeIndex with the last index to display the first set of testimonials
   activeIndex = 0;

  // onButtonClick() {
  //   // Add the functionality you want to execute when the button is clicked
  //   console.log('Button clicked!');
  //   // You can add more logic or navigate to another page, etc.
  // }

  private currentIndex = 0; // Initialize index outside of the setupScrolling function
  private intervalId: any; // Variable to store the interval ID





  services: any[] = [
    { category: 'nurse',
      title: 'Skilled Nursing',
      description: 'Experience expert care with our skilled nursing services, where professionals provide dedicated support, personalized treatment, and ensuring your well-being in the comfort of your home.',
      imageSrc: 'assets/SkilledNurse1.jpg', /* other properties */
    },
    {
      category: 'nurse',
      title: 'Nursing Assistance',
      description: 'Our emergency nursing services provide immediate medical assistance in critical situations. We prioritize your health and safety with rapid response and skilled care.',
      imageSrc: 'assets/BasicNursing.jpg',
    },

    { category: 'others', /* other properties */ },
  ]; // Replace 'any[]' with your actual service model
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

  


  //from here
  // services = [
  //   { category: 'doctor', name: 'Doctor Visit', description: 'Description for Doctor Visit service goes here.' },
  //   { category: 'nurse', name: 'Nurse', description: 'Description for Nurse service goes here.' },
  //   { category: 'delivery', name: 'Delivery', description: 'Description for Delivery service goes here.' },
  //   // Add more services as needed
  // ];

  // filteredServices: any[] = this.services;

  // filterServices(category: string): void {
  //   if (category === 'all') {
  //     this.filteredServices = this.services;
  //   } else {
  //     this.filteredServices = this.services.filter(service => service.category === category);
  //   }
  // }
  //till



  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) {}

  ngOnInit() {
    this.setupScrolling();
    this.setupDotClickHandlers();
    setInterval(() => this.nextTestimonial(), 5000);
  }

  private updateContent() {
    this.renderer.setProperty(this.el.nativeElement.querySelector('#scrollingText'), 'innerHTML', this.scrollingTexts[this.currentIndex]);
    this.renderer.setProperty(this.el.nativeElement.querySelector('#description'), 'innerHTML', this.descriptions[this.currentIndex]);
  }

  private updateActiveDot() {
    this.scrollDots.forEach((dot, i) => {
      this.renderer.setStyle(this.el.nativeElement.querySelector(`#${dot}`), 'width', i === this.currentIndex ? '15px' : '10px');
      this.renderer.setStyle(this.el.nativeElement.querySelector(`#${dot}`), 'height', i === this.currentIndex ? '15px' : '10px');
    });
  }

  private transitionText() {
    const textContainer = this.el.nativeElement.querySelector('.text-container');
    this.renderer.setStyle(textContainer, 'animation', 'none');
    setTimeout(() => {
      this.renderer.setStyle(textContainer, 'animation', 'fadeInLeft 1s forwards');
    }, 100);
  }

  nextTestimonial() {
    this.activeIndex = (this.activeIndex + 1) % (this.testimonials.length - this.testimonialsPerSlide + 1);
  }

  prevTestimonial() {
    this.activeIndex = (this.activeIndex - 1 + this.testimonials.length) % (this.testimonials.length - this.testimonialsPerSlide + 1);
  }//till


  private setupScrolling() {
    this.updateContent();
    this.transitionText();

    // Clear the existing interval if it exists
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // After the third text, reset to the first text and continue
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.scrollingTexts.length;
      this.updateContent();
      this.transitionText();
      this.updateActiveDot();
    }, 5000); // Interval after displaying the third text
  }

  // private setupDotClickHandlers() {
  //   this.scrollDots.forEach((dot, index) => {
  //     const dotElement = this.el.nativeElement.querySelector(`#${dot}`);
  //     dotElement.addEventListener('click', () => {
  //       this.currentIndex = index;
  //       this.setupScrolling();
  //     });
  //   });
  // }


  private setupDotClickHandlers() {
    this.scrollDots.forEach((dot, index) => {
      const dotElement = this.el.nativeElement.querySelector(`#${dot}`);
      dotElement.addEventListener('click', () => {
        this.currentIndex = index;
        this.updateContent();
        this.transitionText();
        setTimeout(() => {
          this.updateActiveDot();
        }, 100); // Delay to ensure styles are updated after the transition
        this.setupScrolling();
      });
    });
  }

  // AboutUs
  navigateToAboutUs(): void {
    // Navigate to the "aboutus" route
    this.router.navigate(['/aboutus']);
  }
  
  bookNow(): void {
    // Implement the functionality when the "Book Now" button is clicked
    // You can handle form submission, send data to a server, etc.
    console.log('Booking service...');
  }



  

}