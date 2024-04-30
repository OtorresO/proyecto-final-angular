import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAsideComponent } from './link-aside.component';

describe('LinkAsideComponent', () => {
  let component: LinkAsideComponent;
  let fixture: ComponentFixture<LinkAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkAsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
