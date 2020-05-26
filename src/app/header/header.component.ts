import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean = false;
    subscription: Subscription;


    constructor(private dataService: DataStorageService, private authService: AuthService) { }

    ngOnInit(): void {
        this.subscription = this.authService.userSubject
            .subscribe(
                (user: User) => {
                    // this.isAuthenticated = user ? true : false;
                    //same ho
                    this.isAuthenticated = !!user;
                    console.log(!!user);
                }
            );
    }

    onSaveData() {
        this.dataService.storeRecipes();

    }

    onFetchData() {
        this.dataService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }



}