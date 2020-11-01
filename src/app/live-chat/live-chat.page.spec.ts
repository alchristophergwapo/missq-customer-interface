import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LiveChatPage } from './live-chat.page';

describe('LiveChatPage', () => {
  let component: LiveChatPage;
  let fixture: ComponentFixture<LiveChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LiveChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
