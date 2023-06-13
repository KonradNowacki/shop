import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapsuleComponent } from './capsule.component';
import { By } from '@angular/platform-browser';

describe('CapsuleComponent', () => {
  let component: CapsuleComponent;
  let fixture: ComponentFixture<CapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapsuleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct type and color', () => {
    // GIVEN
    component.type = 'outline';
    component.color = 'success';

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(component.capsuleClass).toBe('outline--success');
  });
});
