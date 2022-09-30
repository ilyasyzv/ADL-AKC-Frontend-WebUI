import {Component, OnInit} from '@angular/core';
import {OktaAuthStateService} from '@okta/okta-angular';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthState} from '@okta/okta-auth-js';

@Component({
    selector: 'app-profile',
    template: `
        <div class="profile-card">
            <div class="shield"></div>
            <p *ngIf="name$ | async as name">Hello {{name}}!</p>
        </div>
    `
})

export class ProfileComponent implements OnInit {

    public name$!: Observable<string>;

    constructor(private oktaAuthStateService: OktaAuthStateService) {
    }

    public ngOnInit(): void {
        this.name$ = this.oktaAuthStateService.authState$.pipe(
            filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
            map((authState: AuthState) => authState.idToken?.claims.name ?? '')
        );

    }
}
