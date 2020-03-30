import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecognizeComponent } from './pages/recognize/recognize.component';
import { ListComponent } from './pages/list/list.component';
import { UploadComponent } from './pages/upload/upload.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'ui/home', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'ui' },
  { path: 'ui/home', component: HomepageComponent, pathMatch: 'full' },
  { path: 'ui/register', component: RegisterComponent },
  { path: 'ui/recognize', component: RecognizeComponent },
  { path: 'ui/list', component: ListComponent },
  { path: 'ui/upload', component: UploadComponent },
  { path: 'ui/login', component: LoginComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes),
  ],
})
export class AppRoutingModule { }
