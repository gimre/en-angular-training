import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoAddComponent } from './crypto-add.component';

describe('CryptoAddComponent', () => {
  let component: CryptoAddComponent;
  let fixture: ComponentFixture<CryptoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
