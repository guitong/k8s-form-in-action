import { Injector } from '@angular/core';
import { FormArray } from '@angular/forms';

import { BaseResourceFormComponent } from './base-resource-form.component';

export abstract class BaseResourceFormArrayComponent<
  R extends Object = { [key: string]: any },
  F extends Object = R
> extends BaseResourceFormComponent<R[], F[]> {
  form: FormArray;

  get length() {
    return this.form.length;
  }

  /**
   * Method to create the default form
   */
  createForm() {
    return new FormArray([]);
  }

  getDefaultFormModel(): F[] {
    return [];
  }

  getResourceMergeStrategy() {
    return false;
  }

  add(index = this.length) {
    this.form.insert(index, this.getOnFormArrayResizeFn()([index]));
    this.cdr.markForCheck();
  }

  remove(index: number) {
    this.form.removeAt(index);
    this.cdr.markForCheck();
  }

  constructor(injector: Injector) {
    super(injector);
  }
}
