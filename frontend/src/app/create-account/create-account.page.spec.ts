import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateAcountPage } from './create-account.page';

describe('CreateAcountPage', () => {

  let component: CreateAcountPage;
  let fixture: ComponentFixture<CreateAcountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAcountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAcountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
