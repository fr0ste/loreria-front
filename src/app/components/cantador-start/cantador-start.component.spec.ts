import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantadorStartComponent } from './cantador-start.component';

describe('CantadorStartComponent', () => {
  let component: CantadorStartComponent;
  let fixture: ComponentFixture<CantadorStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantadorStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CantadorStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
