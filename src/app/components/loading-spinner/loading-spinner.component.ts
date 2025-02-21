import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  template: `
    <div class="lds-ring">
      <div [style.borderColor]="borderColor()"></div>
      <div [style.borderColor]="borderColor()"></div>
      <div [style.borderColor]="borderColor()"></div>
      <div [style.borderColor]="borderColor()"></div>
    </div>
  `,
  styles: `
    :host {
      max-width: fit-content;
      margin-inline: auto;
      display: block;
    }
    .lds-ring {
      display: inline-block;
      position: relative;
      width: 64px;
      height: 64px;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      border: 8px solid #333;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }

  `,
})
export class LoadingSpinnerComponent {
  color = input('#333');

  borderColor = computed(() => {
    return `${this.color()} transparent transparent transparent`;
  });
}
