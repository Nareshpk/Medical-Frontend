import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchedPopupComponent } from '../searched-popup/searched-popup.component';
import { SearchFindComponent } from './search-find.component';


const routes: Routes = [{
  path: '',
  component: SearchFindComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchFindRoutingModule { }
