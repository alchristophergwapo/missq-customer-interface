import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkforcePage } from './workforce.page';

describe('WorkforcePage', () => {
  let component: WorkforcePage;
  let fixture: ComponentFixture<WorkforcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkforcePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkforcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
