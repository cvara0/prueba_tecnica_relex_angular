import {RouterModule,Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostListComponent } from './components/post-list/post-list.component';
/* se crea una ruta que muestra el ts  */
const APP_ROUTES: Routes=[
    {path:'home',component:HomeComponent},
    {path:'post-form',component:PostFormComponent},
    {path:'post-list',component:PostListComponent},
    
    {path:'**',pathMatch:'full',redirectTo:'home'}//si no encuentra la ruta ejecuta esta, ruta por defecto
];
export const APP_ROUTING=RouterModule.forRoot(APP_ROUTES);
