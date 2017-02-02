import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from '../welcome/welcome.component';
import { ListsComponent } from '../lists/lists.component';
import { RegularItemsComponent } from '../regular-items/regular-items.component';
import { ListDetailComponent } from '../list-detail/list-detail.component';
import { LoginComponent } from '../login/login.component';
import { ListsResolverService } from '../resolvers/lists-resolver.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'lists',
        component: ListsComponent,
        resolve: {
            lists: ListsResolverService
        }
    },
    {
        path: 'regular-items',
        component: RegularItemsComponent
    },
    {
        path: 'list/:id',
        component: ListDetailComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [ RouterModule ],
    declarations: []
})
export class AppRoutingModule { }
