import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './core/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    if(!this.authService.accessToken) {
      this.router.navigate(['/auth/sign-in'])
    }
    // if (this.authService.accessToken) {
    //   let user: any = jwtDecode(this.authService.accessToken);
    //   this.authService.getMerchantById(user.merchantId).subscribe((res: any) => {
    //     if (res.success) {
    //       this.userService.merchant = res.data
    //       this.authService.redirect(res.data);
    //     }
    //   })
    // }

  };
}
