import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalBookingsPage } from './modal-bookings.page';

describe('ModalBookingsPage', () => {
  let component: ModalBookingsPage;
  let fixture: ComponentFixture<ModalBookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBookingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalBookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
