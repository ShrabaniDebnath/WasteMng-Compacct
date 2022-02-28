import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {'path' :'',
  'component': LoginComponent
},
  {'path' :'Home',
  loadChildren:  () =>
  import(
    "././Home/Layout/layout.module"
  ).then(m => m.AppModule),
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
