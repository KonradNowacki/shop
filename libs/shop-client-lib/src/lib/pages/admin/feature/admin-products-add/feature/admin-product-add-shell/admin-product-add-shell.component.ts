import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminProductAddForm} from "../../utils/admin-product-add.form";
import {ButtonComponent, InputComponent} from "@shop/common-ui";
import {TranslocoModule} from "@ngneat/transloco";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'shop-admin-product-add-shell',
  standalone: true,
  imports: [CommonModule, InputComponent, TranslocoModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './admin-product-add-shell.component.html',
  styleUrls: ['./admin-product-add-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AdminProductAddForm]
})
export class AdminProductAddShellComponent {
  protected readonly form = inject(AdminProductAddForm).buildForm();
}
