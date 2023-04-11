import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAmountComponent } from './show-amount.component';

describe('ShowAmountComponent', () => {
  let component: ShowAmountComponent;
  let fixture: ComponentFixture<ShowAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
