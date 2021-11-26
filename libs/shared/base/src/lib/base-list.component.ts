import { Observable, Subject } from 'rxjs';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import {
  Directive,
  HostListener,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActionEnum, ActionType, ReziseTable } from '@school-v2/constant';
import { BaseCheckPermission } from '@school-v2/auth/data-access';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { SafeAny } from '@school-v2/shared/utils';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseListComponent<T>
  extends BaseCheckPermission
  implements OnInit, OnDestroy
{
  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective | undefined;
  actionType = ActionType;

  opened = false;
  gridView$: Observable<GridDataResult> | undefined;
  gridState: State = {
    sort: [{ field: 'id', dir: 'desc' }],
    skip: 0,
    take: 20,
  };
  isLoading = false;

  pageConfig: PagerSettings | false = false;
  selectionIds: number[] = [];

  searchControl = new FormControl();
  isSearchAdvanced = false;
  isSearchFirsttime = false;

  model: T | undefined;
  action: ActionEnum | undefined;
  pageHeight = window.innerHeight - ReziseTable + 10;
  protected destroyed$ = new Subject();

  constructor(injector: Injector) {
    super(injector);
  }

  protected get queryOptions() {
    const skip = this.gridState.skip ? this.gridState.skip : 0;
    const take = this.gridState.take ? this.gridState.take : 0;
    let field = '';
    let dir = '';
    if (this.gridState.sort) {
      field = this.gridState.sort[0].field;
      dir = this.gridState.sort[0].dir ? this.gridState.sort[0].dir : 'asc';
    }

    return {
      pageNumber: skip / take + 1,
      pageSize: this.gridState.take,
      keyword: this.searchControl.value,
      sortCol: field,
      sortName: field,
      isAsc: dir === 'asc',
      sortASC: dir === 'asc',
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: SafeAny) {
    this.pageHeight = event.target.innerHeight - ReziseTable + 12;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadItems();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  showTooltip(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (
      (element.nodeName === 'TD' || element.nodeName === 'TH') &&
      element.offsetWidth < element.scrollWidth
    ) {
      this.tooltipDir?.toggle(element);
    } else {
      this.tooltipDir?.hide();
    }
  }

  /**
   * Adds handler
   */
  addHandler() {
    this.model = undefined;
    this.action = ActionEnum.CREATE;
    this.showFormCreateOrUpdate();
  }

  copyHandler(dataItem: SafeAny) {
    this.model = dataItem;
    this.action = ActionEnum.DUPLICATE;
    this.showFormCreateOrUpdate();
  }

  /**
   * Edits handler
   * @param dataItem
   */
  editHandler(dataItem: SafeAny) {
    this.model = dataItem;
    this.action = ActionEnum.UPDATE;
    this.showFormCreateOrUpdate();
  }

  onStateChange(state: State) {
    this.gridState = state;
    this.loadItems();
  }

  onSearchChange() {
    this.gridState.skip = 0;
    this.selectionIds = [];
    this.loadItems();
  }

  onToggleSearchAdvanced() {
    this.isSearchFirsttime = true;
    const el = document.querySelector('.search-backdrop');
    this.isSearchAdvanced = !this.isSearchAdvanced;
    if (this.isSearchAdvanced) {
      el?.classList.add('search-overlay');
    } else {
      el?.classList.remove('search-overlay');
    }
  }

  refresh() {
    this.loadItems();
  }

  protected abstract showFormCreateOrUpdate(): any;
  protected abstract loadItems(): any;
}