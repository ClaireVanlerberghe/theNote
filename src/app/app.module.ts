import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { NoteComponent } from './note/note.component';
import { CreatedNoteComponent } from './created-note/created-note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { Error404Component } from './error404/error404.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    HomeComponent,
    UserComponent,
    NoteComponent,
    CreatedNoteComponent,
    UpdateNoteComponent,
    Error404Component,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
