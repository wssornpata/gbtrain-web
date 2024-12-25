import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ControlService, NoopConverter, validators } from '../../services/control.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchFormService {
  constructor(
    private fb: FormBuilder,
    private controlService: ControlService
  ) {}

  initSearchForm(destroyObservable: Observable<any>): FormGroup {
    return this.fb.group({
      'origin': this.controlService.getFormControl(
        'origin',
        destroyObservable,
        NoopConverter,
        {
          validators: [
            validators.required('Origin is required.'),
            validators.maxLength('Origin cannot be more than %s characters long.', 100),
          ],
        }
      ),
      'destination': this.controlService.getFormControl(
        'destination',
        destroyObservable,
        NoopConverter,
        {
          validators: [
            validators.required('Destination is required.'),
            validators.maxLength('Destination cannot be more than %s characters long.', 100),
          ],
        }
      ),
      'type': this.controlService.getFormControl(
        'type',
        destroyObservable,
        NoopConverter,
        {
          validators: [
            // validators.required('Destination is required.'),
            // validators.maxLength('Destination cannot be more than %s characters long.', 100),
          ],
        }
      ),
    });
  }
}
