import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { NoteComponent } from './note/note.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { UserComponent } from './user/user.component';
import { CreatedNoteComponent } from './created-note/created-note.component';

const routes: Routes = [
  {path: "/", component: SignUpComponent},
  {path: "/login", component: LogInComponent},
  {path:"/home", component: HomeComponent},
  {path:"/note", component: NoteComponent},
  {path:"/updatenote", component: UpdateNoteComponent},
  {path:"/user", component: UserComponent},
  {path:"/creatednote", component: CreatedNoteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
