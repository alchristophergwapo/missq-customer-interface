import { FormGroup, Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';
    
@Directive({
    selector: '[appConfirmedValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmedValidatorDirective,
        multi: true
    }]
})
export class ConfirmedValidatorDirective implements Validator{
    @Input() appConfirmedValidator: string;
    validate(control: AbstractControl): {[key: string]: any} | null{
        const controlToCompare = control.parent.get(this.appConfirmedValidator);
        if(controlToCompare && controlToCompare.value !== control.value){
            return {'notEqual': true};
        }

        return null;
    }
}