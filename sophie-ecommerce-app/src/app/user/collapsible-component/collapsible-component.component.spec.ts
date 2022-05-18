import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollapsibleComponentComponent } from './collapsible-component.component';

describe('CollapsibleComponentComponent', () => {
  let component: CollapsibleComponentComponent;
  let fixture: ComponentFixture<CollapsibleComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapsibleComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
