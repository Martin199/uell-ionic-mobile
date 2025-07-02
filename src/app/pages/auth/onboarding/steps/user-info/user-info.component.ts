import { Component, EventEmitter, OnInit, Output, computed, inject, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/pages/tabs/interfaces/user-interfaces';
import { UserStateService } from 'src/app/core/state/user-state.service';
import { parse, format, isValid  } from 'date-fns';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
    standalone: false,
})
export class UserInfoComponent implements OnInit {
    storageService = inject(StorageService);
    private userState = inject(UserStateService);
    user = computed(() => this.userState.userData());
    @Output() contactInfo = new EventEmitter<{ data: any }>();

    userInfoForm = new FormGroup({
        birthDate: new FormControl('', [Validators.required]),
    });

    isOpen = false;
    displayDate: string = '';
    // user: User | null = null;
    returnInfo = output<any>();

    ngOnInit() {
        if (this.user()?.bornDate) {
            const formattedDate = this.user()?.bornDate ? format(new Date(this.user()!.bornDate), 'dd/MM/yyyy') : '';
            this.userInfoForm.patchValue({ birthDate: formattedDate });
            this.emitBirthDate(formattedDate);
            this.updateDisplayDate(formattedDate);
        }

        this.userInfoForm.get('birthDate')?.valueChanges.subscribe((date) => {
            this.emitBirthDate(date);
        });
    }

    emitBirthDate(date: any) {
        const formattedDate = format(isValid(parse(date, 'dd/MM/yyyy', new Date())) ? parse(date, 'dd/MM/yyyy', new Date()) : parse(date, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd');
        this.contactInfo.emit({ data: formattedDate });
    }

    openDatePicker() {
        this.isOpen = true;
    }

    closeDatePicker() {
        this.isOpen = false;
    }

    onDateChange(event: any) {
        const selectedDate = event.detail.value;

        if (selectedDate) {
            const formattedDate = format(new Date(selectedDate), 'dd/MM/yyyy');

            this.userInfoForm.get('birthDate')?.setValue(selectedDate);

            this.displayDate = formattedDate;
        }
        this.emitBirthDate(this.displayDate);
        this.closeDatePicker();
    }

    updateDisplayDate(date: string) {
        if (date) {
            this.displayDate = new Date(date).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        } else {
            this.displayDate = '';
        }
    }

    getInitialBreakpoint(): number {
        const screenHeight = window.innerHeight;

        if (screenHeight < 600) {
            return 0.9;
        } else {
            return 0.7;
        }
    }
}
