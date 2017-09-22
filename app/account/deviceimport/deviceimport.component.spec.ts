import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceimportComponent } from './deviceimport.component';

describe('DeviceimportComponent', () => {
  let component: DeviceimportComponent;
  let fixture: ComponentFixture<DeviceimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
