import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareToPage } from './share-to.page';

describe('ShareToPage', () => {
  let component: ShareToPage;
  let fixture: ComponentFixture<ShareToPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareToPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareToPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
