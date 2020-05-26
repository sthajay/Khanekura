import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShoppingComponent } from './edit-shopping.component';

describe('EditShoppingComponent', () => {
  let component: EditShoppingComponent;
  let fixture: ComponentFixture<EditShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
