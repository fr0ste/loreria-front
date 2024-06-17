import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerComponentComponent } from './winner-component.component';

describe('WinnerComponentComponent', () => {
  let component: WinnerComponentComponent;
  let fixture: ComponentFixture<WinnerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinnerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
