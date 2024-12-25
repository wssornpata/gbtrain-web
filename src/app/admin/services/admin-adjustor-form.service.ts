import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  ControlService,
  NoopConverter,
  validators,
} from '../../services/control.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAdjustorFormService {
  constructor(
    private fb: FormBuilder,
    private controlService: ControlService
  ) {}

  initAdminAdjustorForm(destroyObservable: Observable<any>): FormGroup {
    return this.fb.group({
      id: this.controlService.getFormControl(
        'id',
        destroyObservable,
        NoopConverter,
        {
          validators: [],
        }
      ),
      description: this.controlService.getFormControl(
        'description',
        destroyObservable,
        NoopConverter,
        {
          validators: [
            validators.required('Description is required.'),
            validators.maxLength(
              'Description cannot be more than %s characters long.',
              255
            ),
          ],
        }
      ),
      price: this.controlService.getFormControl(
        'price',
        destroyObservable,
        NoopConverter,
        {
          validators: [
            validators.required('Price is required.'),
            validators.numberGreater('Price must greater than %s.', 0),
          ],
        }
      ),
      distance: this.controlService.getFormControl(
        'distance',
        destroyObservable,
        NoopConverter,
        {
          validators: [],
        }
      ),
      updateDatetime: this.controlService.getFormControl(
        'updateDatetime',
        destroyObservable,
        NoopConverter,
        {
          validators: [],
        }
      ),
    });
  }
}
