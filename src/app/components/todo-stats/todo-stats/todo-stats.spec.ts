import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoStats } from './todo-stats';

describe('TodoStats', () => {
  let component: TodoStats;
  let fixture: ComponentFixture<TodoStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
