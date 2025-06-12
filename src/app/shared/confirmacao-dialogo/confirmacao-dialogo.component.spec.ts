import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoDialogoComponent } from './confirmacao-dialogo.component';

describe('ConfirmacaoDialogoComponent', () => {
  let component: ConfirmacaoDialogoComponent;
  let fixture: ComponentFixture<ConfirmacaoDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacaoDialogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
