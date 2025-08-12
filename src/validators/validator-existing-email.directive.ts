import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export function existingEmailValidator(userService: UserService, userCurrentEmail: string) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value ?? '';
    if (!email) return of(null);
    if (email === userCurrentEmail) return of(null);
    return timer(300).pipe(
      switchMap(() => userService.getUsedMail(email)),
      map(isUsed => (isUsed ? { emailDuplicate: true } : null)),
      catchError(() => of(null))
    );
  };
}
