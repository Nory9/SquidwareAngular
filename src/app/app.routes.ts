import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadComponent: ()=>{
        return import('./customer/customer.component').then((m=> m.CustomerComponent))
    }    
},
{
    path: 'customer-profile/:id',
    pathMatch: 'full',
    loadComponent: ()=>{
        return import('./customer-profile/customer-profile.component').then((m=> m.CustomerProfileComponent))
    }    
}
];
