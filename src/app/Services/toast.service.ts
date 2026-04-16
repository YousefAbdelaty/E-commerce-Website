import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {

  message$  = signal<string>('');
  visible$  = signal<boolean>(false);
  type$     = signal<'success' | 'error'>('success');

  private timer: any;

  show(message: string, type: 'success' | 'error' = 'success') {
   
    if (this.timer) clearTimeout(this.timer);

    this.message$.set(message);
    this.type$.set(type);
    this.visible$.set(true);

    // auto-hide after 3 seconds
    this.timer = setTimeout(() => {
      this.visible$.set(false);
    }, 3000);
  }
}