import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureStrip } from './feature-strip';

describe('FeatureStrip', () => {
  let component: FeatureStrip;
  let fixture: ComponentFixture<FeatureStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureStrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureStrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
