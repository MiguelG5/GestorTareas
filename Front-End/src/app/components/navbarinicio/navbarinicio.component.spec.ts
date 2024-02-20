import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarinicioComponent } from './navbarinicio.component';

describe('NavbarinicioComponent', () => {
  let component: NavbarinicioComponent;
  let fixture: ComponentFixture<NavbarinicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarinicioComponent]
    });
    fixture = TestBed.createComponent(NavbarinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
