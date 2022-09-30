import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SDashboardComponent} from './s-dashboard/s-dashboard.component';
import {SActivityComponent} from './s-activity/s-activity.component';
import { SRecentHistoryComponent } from './s-recent-history/s-recent-history.component';
import {AProjectsComponent} from './a-projects/a-projects.component'
import { SRelationsComponent } from './s-relations/s-relations.component';
import { AAffiliationsComponent } from './a-affiliations/a-affiliations.component';

import {OktaCallbackComponent, OktaAuthGuard} from '@okta/okta-angular';

const routes: Routes = [
    {path: 'dashboard', component: SDashboardComponent, canActivate: [OktaAuthGuard]},
    {path: 'relations', component: SRelationsComponent, canActivate: [OktaAuthGuard]},
    {path: 'recentactivity', component: SActivityComponent, canActivate: [OktaAuthGuard]},
    {path: 'projects', component: AProjectsComponent, canActivate: [OktaAuthGuard]},
    {path: 'recenthistory', component: SRecentHistoryComponent, canActivate: [OktaAuthGuard]},
    {path: 'affiliations', component: AAffiliationsComponent, canActivate: [OktaAuthGuard]},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login/callback', component: OktaCallbackComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
