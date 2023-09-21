import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ]
    })
    .compileComponents();



    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.useFakeTimers();
  });

    afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should animate text over time', () => {
    const mockCallback = jest.fn();

    component.text = 'Hello';
    component.textToShow = '';
    component.animateText(mockCallback);

    expect(component.textToShow).toBe('');

    jest.advanceTimersByTime(50);
    expect(mockCallback).toHaveBeenCalledWith('H');

    jest.advanceTimersByTime(100);
    expect(mockCallback).toHaveBeenCalledWith('Hel');

    jest.advanceTimersByTime(150);
    expect(mockCallback).toHaveBeenCalledWith('Hello');
  });
});
