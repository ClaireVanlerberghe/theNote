import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authService';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  loginForm!: FormGroup;
  errorMsg!: string;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

ngOnInit() {
this.loginForm = this.formBuilder.group({
email: [null, [Validators.required, Validators.email]],
password: [null, Validators.required]
});
}

onLogin() {

const email = this.loginForm.get('email')!.value;
const password = this.loginForm.get('password')!.value;
console.log("FRONT", email, password);

this.auth.loginUser(email, password).pipe(
tap(() => {


this.router.navigate(['/home']);
}),
catchError(error => {
this.errorMsg = error.message;
console.log("coucou");

return EMPTY;
})
).subscribe();
}

}
