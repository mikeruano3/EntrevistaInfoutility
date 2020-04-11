import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PeopleAddComponent } from './people-add/people-add.component';
import { PeopleEditComponent } from './people-edit/people-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full'},
  { path: 'people-list', component: PeopleListComponent},
  { path: 'people-list/:id', component: PeopleDetailComponent},
  { path: 'people-edit/:id', component: PeopleEditComponent},
  { path: 'people-add', component: PeopleAddComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ PeopleListComponent, PeopleDetailComponent,
  PageNotFoundComponent, PeopleAddComponent, PeopleEditComponent ];
