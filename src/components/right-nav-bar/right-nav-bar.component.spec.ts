import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightNavBarComponent } from './right-nav-bar.component';

describe('RightNavBarComponent', () => {
  let component: RightNavBarComponent;
  let fixture: ComponentFixture<RightNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
