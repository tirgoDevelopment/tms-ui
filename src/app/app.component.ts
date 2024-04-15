import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './core/user/user.service';
import { FuseConfig, FuseConfigService } from '@fuse/services/config';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  config
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private authService: AuthService,
    private _fuseConfigService: FuseConfigService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {

    if(!this.authService.accessToken) {
      this.router.navigate(['/auth/sign-in'])
    }
  }

  
}
