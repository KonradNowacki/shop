import {ChangeDetectionStrategy, Component, Input,} from '@angular/core';

@Component({
  selector: 'shop-auth-card',
  standalone: true,
  template: `
    <div class="card">
      <div class="card__title">
        <h1>{{ title }}</h1>
      </div>

      <div class="card__content">
        <ng-content select="[content]"></ng-content>
      </div>

      <div class="card__actions">
        <ng-content select="[actions]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./auth-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCardComponent {

  @Input() title = '';

}
