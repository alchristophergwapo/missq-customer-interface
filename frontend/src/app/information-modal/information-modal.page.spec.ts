import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformationModalPage } from './information-modal.page';

describe('InformationModalPage', () => {
  let component: InformationModalPage;
  let fixture: ComponentFixture<InformationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
