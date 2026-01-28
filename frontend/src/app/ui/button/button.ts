import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;

  @Output() clicked = new EventEmitter<void>();

  get classes(): string {
    const base =
      'rounded-md font-medium inline-flex items-center justify-center transition-all duration-300';

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-[13px]',
      md: 'px-4 py-2 text-[14px]',
      lg: 'px-6 py-3 text-[16px]',
    };

    const variants: Record<ButtonVariant, string> = {
      primary:
        'bg-green text-white hover:bg-green-700 hover:shadow-lg hover:scale-105',
      secondary:
        'border border-borderLight text-textDark hover:bg-gray-50',
      link:
        'bg-white text-blue-600 hover:bg-blue-600 hover:text-white',
    };

    const disabledClass = this.disabled
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : '';

    return [
      base,
      sizes[this.size],
      variants[this.variant],
      disabledClass,
    ].join(' ');
  }

  handleClick(): void {
    if (this.disabled) return;
    this.clicked.emit();
  }
}
