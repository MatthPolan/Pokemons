import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [AuthFormComponent],
})
export class AuthentificationModule {}
