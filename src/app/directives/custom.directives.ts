import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appFeaturedEvent]',
  standalone: true
})
export class FeaturedEventDirective implements OnInit {
  @Input() appFeaturedEvent: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appFeaturedEvent === true) {
      this.el.nativeElement.style.border = '3px solid #ff9800';
      this.el.nativeElement.style.borderRadius = '8px';
      this.el.nativeElement.style.boxShadow = '0 4px 15px rgba(255, 152, 0, 0.3)';
      this.el.nativeElement.style.backgroundColor = '#fff8f0';
    }
  }
}

@Directive({
  selector: '[appSoldOut]',
  standalone: true
})
export class SoldOutDirective implements OnInit {
  @Input() appSoldOut: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appSoldOut === true) {
      this.el.nativeElement.style.opacity = '0.6';
      this.el.nativeElement.style.backgroundColor = '#f5f5f5';
      this.el.nativeElement.style.cursor = 'not-allowed';
    }
  }
}

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() set appHighlight(condition: boolean) {
    if (condition === true) {
      this.el.nativeElement.style.backgroundColor = '#e8f5e9';
      this.el.nativeElement.style.borderLeft = '4px solid #4caf50';
      this.el.nativeElement.style.paddingLeft = '12px';
    }
  }

  constructor(private el: ElementRef) {}
}

@Directive({
  selector: '[appHoverEffect]',
  standalone: true
})
export class HoverEffectDirective implements OnInit {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = 'all 0.3s ease';
  }

  ngOnInit(): void {
    this.el.nativeElement.addEventListener('mouseenter', () => {
      this.el.nativeElement.style.transform = 'translateY(-5px)';
      this.el.nativeElement.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
    });

    this.el.nativeElement.addEventListener('mouseleave', () => {
      this.el.nativeElement.style.transform = 'translateY(0)';
      this.el.nativeElement.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    });
  }
}

