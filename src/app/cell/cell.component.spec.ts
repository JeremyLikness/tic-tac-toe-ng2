import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CellComponent} from './cell.component';
import {QuotesService} from '../quotes.service';
import {BadTurnService} from '../bad-turn.service';

describe('Component: Cell', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [CellComponent, QuotesService, BadTurnService]);
  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([CellComponent], (component: CellComponent) => { expect(component).toBeTruthy(); }));

  it('should create the component', inject([], () => {
       return builder.createAsync(CellComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(CellComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));

  it('should set the row and column', inject([], () => {
       return builder.createAsync(CellComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             fixture.detectChanges();
             let query = fixture.debugElement.query(By.directive(CellComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
             expect(query.componentInstance.col).toBe(1);
             expect(query.componentInstance.row).toBe(2);
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <cell [row]="row" [col]="col"></cell>
  `,
  directives: [CellComponent]
})
class CellComponentTestController {
  public col: number = 1;
  public row: number = 2;
}
