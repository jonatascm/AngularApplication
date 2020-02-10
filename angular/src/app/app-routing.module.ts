import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EquipmentComponent } from './equipment/equipment.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'client', component: ClientComponent},
  {path: 'equipment', component: EquipmentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
