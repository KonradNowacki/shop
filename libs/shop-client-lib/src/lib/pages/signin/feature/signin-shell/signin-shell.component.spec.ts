import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninShellComponent } from './signin-shell.component';

describe('SigninShellComponent', () => {
  let component: SigninShellComponent;
  let fixture: ComponentFixture<SigninShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
