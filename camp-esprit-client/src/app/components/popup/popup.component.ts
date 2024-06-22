import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  @Input() username!: string;
  @Input() message!: string;
  @Input('number-of-persons') numberOfPersons!: number;
  @Input() date!: string;


  onClose(): void {
    this.close.emit();
  }
}
