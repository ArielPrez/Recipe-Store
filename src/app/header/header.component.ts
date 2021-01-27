import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorage: DataStorageService,
              private authServ: AuthService) {}

  ngOnInit() {
    this.userSub = this.authServ.user.subscribe(
      (user) => {
        // this.isAuthenticagted = !user ? false : true;
        // The shortest method.
        this.isAuthenticated = !!user;
        // console.log(!user + 'false <==or==> true');
        // console.log(!!user);
      }
    );
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }
  onFetchRecipes() {
    this.dataStorage.fetchRecipes().subscribe();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
