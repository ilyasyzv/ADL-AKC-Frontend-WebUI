import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {OktaAuthStateService, OKTA_AUTH} from '@okta/okta-angular';
import {AuthState, OktaAuth} from '@okta/okta-auth-js';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'samld-webui-auth';
    public isAuthenticated$!: Observable<boolean>;

    constructor(private router: Router, private oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    }

    ngOnInit(): void {
        this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
            tap(state => {
                if (!state.isAuthenticated) {
                    console.log('Not authenticated', state);
                } else {
                    console.log('Authenticated! ', state);
                }
            }),
            filter((s: AuthState) => !!s),
            map((s: AuthState) => s.isAuthenticated ?? false)
        );
    }

    public async signIn(): Promise<void> {
        await this.oktaAuth.signInWithRedirect().then(_ => this.router.navigate(['/dashboard']));
    }

    public async signOut(): Promise<void> {
        await this.oktaAuth.signOut();
    }
}
