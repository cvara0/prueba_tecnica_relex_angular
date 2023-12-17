import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignaComponent } from './consigna.component';

describe('ConsignaComponent', () => {
  let component: ConsignaComponent;
  let fixture: ComponentFixture<ConsignaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
