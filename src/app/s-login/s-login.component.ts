import {Component, Inject, OnInit} from '@angular/core';
import {AuthState, OktaAuth} from '@okta/okta-auth-js';
import {OKTA_AUTH, OktaAuthStateService} from '@okta/okta-angular';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import { AppService } from '../services/app.service';
import { ModalService } from '../s-modal/s-modal.service';

@Component({
    selector: 'app-s-login',
    templateUrl: './s-login.component.html',
    styleUrls: ['./s-login.component.scss'],
})
export class SLoginComponent implements OnInit {
    public name$!: Observable<string>;
    public email$!: Observable<string>;

    constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private router: Router, private oktaAuthStateService: OktaAuthStateService, public readonly _appService: AppService, private modalService: ModalService) {
    }

    ngOnInit(): void {
        this.name$ = this.oktaAuthStateService.authState$.pipe(
            filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
            map((authState: AuthState) => authState.idToken?.claims.name ?? 'Guest')
        );

        this.email$ = this.oktaAuthStateService.authState$.pipe(
            filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
            map((authState: AuthState) => authState.idToken?.claims.email ?? 'Guest')
        );

        this.oktaAuthStateService.authState$.subscribe(res=>{
            this._appService.tokenId = res.accessToken?.accessToken;
            this._appService.userName = res.idToken?.claims?.preferred_username
        })
    }

    openModal(id: string): void {
        this.modalService.open(id);
    }

    closeModal(id: string): void {
        this.modalService.close(id);
    }

    public async signIn(): Promise<void> {
        await this.oktaAuth.signInWithRedirect().then(_ => this.router.navigate(['/dashboard']));
    }

    public async signOut(): Promise<void> {
        await this.oktaAuth.signOut();
    }
}
