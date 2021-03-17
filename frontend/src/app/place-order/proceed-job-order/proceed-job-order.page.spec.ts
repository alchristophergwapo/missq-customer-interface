import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProceedJobOrderPage } from './proceed-job-order.page';

describe('ProceedJobOrderPage', () => {
  let component: ProceedJobOrderPage;
  let fixture: ComponentFixture<ProceedJobOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProceedJobOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProceedJobOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
