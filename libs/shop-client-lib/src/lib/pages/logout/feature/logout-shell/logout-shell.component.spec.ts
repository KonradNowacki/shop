import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutShellComponent } from './logout-shell.component';

describe('LogoutShellComponent', () => {
  let component: LogoutShellComponent;
  let fixture: ComponentFixture<LogoutShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
