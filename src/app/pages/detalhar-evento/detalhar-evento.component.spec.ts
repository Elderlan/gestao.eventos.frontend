import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharEventoComponent } from './detalhar-evento.component';

describe('DetalharEventoComponent', () => {
  let component: DetalharEventoComponent;
  let fixture: ComponentFixture<DetalharEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalharEventoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalharEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
