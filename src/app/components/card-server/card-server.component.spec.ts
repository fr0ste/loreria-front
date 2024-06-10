import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardServerComponent } from './card-server.component';

describe('CardServerComponent', () => {
  let component: CardServerComponent;
  let fixture: ComponentFixture<CardServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardServerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
