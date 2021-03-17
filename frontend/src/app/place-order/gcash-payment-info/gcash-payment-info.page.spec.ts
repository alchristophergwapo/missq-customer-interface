import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GcashPaymentInfoPage } from './gcash-payment-info.page';

describe('GcashPaymentInfoPage', () => {
  let component: GcashPaymentInfoPage;
  let fixture: ComponentFixture<GcashPaymentInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcashPaymentInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GcashPaymentInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
