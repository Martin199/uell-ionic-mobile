import { Component, input, output, computed, ViewChildren, QueryList, effect, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonInput, IonLabel, InputCustomEvent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-individual-inputs',
  templateUrl: './individual-inputs.component.html',
  styleUrls: ['./individual-inputs.component.scss'],
  imports: [IonInput, IonLabel, IonInput],
})
export class IndividualInputsComponent {
  label = input<string>();
  digits = input.required<number>();
  control = input<FormControl>();
  number = output<number>();
  private activeIndex = 0;
  @ViewChildren('input') inputs!: QueryList<IonInput>;

  digitsArray = computed(() => {
    return Array.from({ length: this.digits() }, (_, index) => index);
  });

  private inputValuesSignal = signal<string[]>([]);

  inputValues = computed(() => {
    return this.inputValuesSignal();
  });

  private updateFormControl = effect(() => {
    const values = this.inputValues();
    const allFilled = values.length > 5 && values.every(value => value && value.length === 1);

    if (allFilled) {
      const joinedValue = values.join('');
      const numberValue = parseInt(joinedValue);

      if (!isNaN(numberValue)) {
        this.number.emit(numberValue);
        if (this.control()) {
          setTimeout(() => {
            this.control()!.setValue(numberValue);
          }, 0);
        }
      }
    } else {
      if (this.control()) {
        setTimeout(() => {
          this.control()!.setValue(null);
        }, 0);
      }
    }
  });

  focusInput(index: number) {
    if (index < 0 || index >= this.digits()) return;

    this.activeIndex = index;
    const inputs = this.inputs.toArray();
    if (inputs[index]) {
      const ionInput = inputs[index];
      if (ionInput) ionInput.setFocus();
    }
  }

  onFocus(index: number) {
    this.activeIndex = index;
  }

  onInput(event: InputCustomEvent, index: number) {
    const value = event.detail.value;

    if (value && !/^[0-9]$/.test(value)) {
      event.target.value = '';
      return;
    }

    const currentValues = this.inputValuesSignal();
    const newValues = [...currentValues];
    newValues[index] = value || '';
    this.inputValuesSignal.set(newValues);

    if (value && index < this.digits() - 1) {
      this.focusInput(index + 1);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      event.preventDefault();

      const inputs = this.inputs.toArray();
      const currentInput = inputs[index];

      if (currentInput && currentInput.value) {
        currentInput.value = '';
        const currentValues = this.inputValuesSignal();
        const newValues = [...currentValues];
        newValues[index] = '';
        this.inputValuesSignal.set(newValues);
        return;
      } else if (index > 0) {
        const prevInput = inputs[index - 1];
        if (prevInput) {
          prevInput.value = '';
          this.focusInput(index - 1);
          const currentValues = this.inputValuesSignal();
          const newValues = [...currentValues];
          newValues[index - 1] = '';
          this.inputValuesSignal.set(newValues);
        }
      }
    } else if (event.key === 'ArrowRight' && index < this.digits() - 1) {
      event.preventDefault();
      this.focusInput(index + 1);
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
    } else if (event.key === 'Tab') {
      return;
    } else if (
      !/^[0-9]$/.test(event.key) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)
    ) {
      event.preventDefault();
    }
  }
}
