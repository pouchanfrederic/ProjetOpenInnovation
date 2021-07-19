import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaletsListComponent } from './chalets-list.component';

describe('ChaletsListComponent', () => {
  let component: ChaletsListComponent;
  let fixture: ComponentFixture<ChaletsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaletsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaletsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
