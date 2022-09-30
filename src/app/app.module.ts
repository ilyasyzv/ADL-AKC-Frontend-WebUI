import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {OktaAuthModule, OKTA_CONFIG} from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {Subject} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SNavComponent} from './s-nav/s-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SLoginComponent} from './s-login/s-login.component';
import {SSearchComponent} from './s-search/s-search.component';
import {SDashboardComponent} from './s-dashboard/s-dashboard.component';
import {SActivityComponent} from './s-activity/s-activity.component';
import {STabsComponent} from './s-tabs/s-tabs.component';
import {SKolTableComponent} from './s-kol-table/s-kol-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {SKolCardComponent} from './s-kol-card/s-kol-card.component';
import {SKolChartComponent} from './s-kol-chart/s-kol-chart.component';
import {SAlconLogoComponent} from './s-alcon-logo/s-alcon-logo.component';
import {SChartTabsComponent} from './s-chart-tabs/s-chart-tabs.component';
import {ProfileComponent} from './profile/profile.component';
import { SRecentHistoryComponent } from './s-recent-history/s-recent-history.component';
import { SActivityCardComponent } from './s-activity-card/s-activity-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { APageTitleComponent } from './a-page-title/a-page-title.component';
import { CommonModule } from '@angular/common';
import { AAffiliationsComponent } from './a-affiliations/a-affiliations.component';
import { AMapLocationComponent } from './a-map-location/a-map-location.component';
import { AProjectsComponent } from './a-projects/a-projects.component';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { ModalModule } from './s-modal';
import { SDocumentationComponent } from './s-documentation/s-documentation.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
import { ChartsModule } from 'ng2-charts';
import { HighlighterPipe } from './s-kol-card/highlighter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SRelationsComponent } from './s-relations/s-relations.component';
var oktaAuth;

if(window.location.origin === 'https://deep-akc.dev.apps.alconcloud.com'){
    oktaAuth = new OktaAuth({
        issuer: 'https://alcon.oktapreview.com',
        clientId: '0oa18twb40vqMRw0o0h8',
        redirectUri: window.location.origin + '/login/callback'
    });
}else if(window.location.origin === 'https://deep-akc.apps.alconcloud.com'){
    oktaAuth = new OktaAuth({  
        issuer: 'https://alcon.okta.com/',
        clientId: '0oal0bba4y1XGgUBs357',
        redirectUri: window.location.origin + '/login/callback'
    });
}else if(window.location.origin === 'https://deep-akc.qa.apps.alconcloud.com'){
    oktaAuth = new OktaAuth({  
        issuer: 'https://alcon.oktapreview.com',
        clientId: '0oa1bnvci5vPiOPEi0h8',
        redirectUri: window.location.origin + '/login/callback'
    });
}else{
    oktaAuth = new OktaAuth({  
        issuer: 'https://dev-55613508.okta.com',
        clientId: '0oa59993c1KiGNI2u5d7',
        redirectUri: window.location.origin + '/login/callback'
    });
}


@NgModule({
    declarations: [
        AppComponent,
        CanvasJSChart,
        SNavComponent,
        SLoginComponent,
        SSearchComponent,
        SDashboardComponent,
        SDocumentationComponent,
        SActivityComponent,
        STabsComponent,
        SKolTableComponent,
        SKolCardComponent,
        SKolChartComponent,
        SAlconLogoComponent,
        SChartTabsComponent,
        ProfileComponent,
        SRecentHistoryComponent,
        SActivityCardComponent,
        APageTitleComponent,
        AAffiliationsComponent,
        AMapLocationComponent,
        AProjectsComponent,
        HighlighterPipe,
        SRelationsComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        OktaAuthModule,
        /* configure app with AmplifyUIAngularModule */
        // AmplifyUIAngularModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatGridListModule,
        MatRippleModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatTooltipModule,
        ModalModule,
        ChartsModule
    ],
    providers: [
        Subject,
        {provide: OKTA_CONFIG, useValue: {oktaAuth}}
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
