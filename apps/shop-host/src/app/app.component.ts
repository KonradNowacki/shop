import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'shop-root',
  template: `<shop-nx-welcome></shop-nx-welcome>
    <router-outlet></router-outlet>`,
  styles: [''],
})
export class AppComponent {
  title = 'shop-host';
}
