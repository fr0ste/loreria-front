import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyCantadorComponent } from './lobby-cantador.component';

describe('LobbyCantadorComponent', () => {
  let component: LobbyCantadorComponent;
  let fixture: ComponentFixture<LobbyCantadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LobbyCantadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LobbyCantadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
