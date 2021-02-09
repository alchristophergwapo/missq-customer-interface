import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateAcountPage } from './create-account.page';

describe('CreateAcountPage', () => {
<<<<<<< HEAD
  let component: CreateAccountPage;
  let fixture: ComponentFixture<CreateAccountPage>;
=======
  let component: CreateAcountPage;
  let fixture: ComponentFixture<CreateAcountPage>;
>>>>>>> 2d75a7157dd68fd5e4a1c5a34c0ed3e97750e135

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
