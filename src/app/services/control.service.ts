import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import {
  ValidatorFn,
  AbstractControl,
  AbstractControlOptions,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';

const INVALID_VALUE = { value: 'invalid' };

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  constructor(private fb: FormBuilder) {}

  private controlMap: {
    [propkey: string]: {
      control: AbstractControl;
      converter: Converter;
    };
  } = {};

  private subjectMap:
    | {
        [_: string]: BehaviorSubject<any>;
      }
    | undefined;

  form: any;

  getSubject<T>(key: string): BehaviorSubject<T> {
    if (this.subjectMap == null) {
      this.subjectMap = {};
    }
    if (this.subjectMap[key] == null) {
      this.subjectMap[key] = new BehaviorSubject(_.get(this.form, key));
      this.subjectMap[key].subscribe((data) => {
        if (_.get(this.form, key) != data) {
          _.set(this.form, key, data);
        }
      });
    }
    return this.subjectMap[key];
  }

  getFormControl(
    jsonKey: string,
    destroyObserable: Observable<any>,
    converter?: Converter,
    validatorsOrOption?: typeof FormControl extends {
      new (a: any, b: infer A, ...c: any[]): void;
    }
      ? A
      : never
  ): FormControl {
    let form = this.form;
    if (converter == undefined) {
      converter = NoopConverter;
    }
    let formControlOption: AbstractControlOptions = {};
    let validators: ValidatorFn[] = [];
    if (validatorsOrOption != null) {
      if (typeof validatorsOrOption === 'function') {
        validators = [validatorsOrOption];
      } else if (Array.isArray(validatorsOrOption)) {
        validators = validatorsOrOption;
      } else {
        formControlOption = { ...validatorsOrOption };
        let validator = validatorsOrOption.validators;
        if (typeof validator === 'function') {
          validators = [validator];
        } else if (Array.isArray(validator)) {
          validators = validator;
        }
      }
    }
    if (validators == undefined) {
      validators = [];
    }

    formControlOption.validators = validators;
    let fc = this.fb.control(
      converter.toString(_.get(form, jsonKey, '')),
      formControlOption
    );
    fc.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(destroyObserable))
      .subscribe((value: string | number | null) => {
        if (value !== null) {
          const convertedValue = converter.fromString(value);
          if (convertedValue !== INVALID_VALUE) {
            this.getSubject(jsonKey).next(convertedValue);
          }
        }
      });
    // .subscribe((value: string) => {
    // 	const convertedValue = converter.fromString(value);
    // 	if ((convertedValue as any) != INVALID_VALUE) {
    // 		this.getSubject(jsonKey).next(convertedValue)
    // 	}
    // })
    this.getSubject(jsonKey)
      .pipe(distinctUntilChanged(), takeUntil(destroyObserable))
      .subscribe((data) => {
        fc.setValue(converter.toString(data));
      });
    this.controlMap[jsonKey] = {
      control: fc,
      converter: converter,
    };
    return fc;
  }

  geyMyFormControl(ant: any): FormControl {
    return this.fb.control('', [Validators.required, Validators.minLength(3)]);
  }
}

type ValidationErrorCode = {
  type: 'errorcode';
  value: string;
};

type Converter = {
  fromString(value: any): any;
  toString(value: any): string | number | null;
};

function isEmpty(value: any) {
  if (value == null) {
    return true;
  }
  if (typeof value == 'string') {
    if (value.length == 0) {
      return true;
    }
  }
  return false;
}

export let NoopConverter: Converter = {
  fromString: (value: string) => value,
  toString: (value: any) => {
    if (value == undefined) {
      return null;
    }
    return String(value);
  },
};

export let validators = {
  required(errorCode: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (isEmpty(control.value)) {
        return {
          required: validators.errorCode(errorCode),
        };
      }
      return null;
    };
  },
  maxLength(errorCode: string, length: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (isEmpty(control.value)) return null;
      let val: string = control.value;
      if (val.length > length) {
        return {
          maxLength: validators.errorCode(
            errorCode.replace('%s', length.toString())
          ),
        };
      }
      return null;
    };
  },
  numberGreater(errorCode: string, size: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (isEmpty(control.value)) return null;
      let val: number = control.value;
      if (val <= size) {
        return {
          minNumber: validators.errorCode(
            errorCode.replace('%s', size.toString())
          ),
        };
      }
      return null;
    };
  },
  errorCode(errorCode: string): ValidationErrorCode {
    return {
      type: 'errorcode',
      value: errorCode,
    };
  },
};
