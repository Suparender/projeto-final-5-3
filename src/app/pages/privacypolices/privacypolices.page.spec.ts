import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacypolicesPage } from './privacypolices.page';

describe('PrivacypolicesPage', () => {
  let component: PrivacypolicesPage;
  let fixture: ComponentFixture<PrivacypolicesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrivacypolicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
