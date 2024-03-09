import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { of, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);

    return inject(AuthService).check().pipe(
        switchMap((authenticated) => {
            if (!authenticated) {
                const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`/auth/sign-in?${redirectURL}`);
                return of(urlTree); 
            }
            let user:any = jwtDecode(localStorage.getItem('tmc'));
            if (user.completed && (!user.verified && !user.rejected) && state.url !== '/register/step3') {
                return of(false)
            }
            else if(!user.completed && state.url !== '/register/step3' && state.url !== '/register/step2'&& state.url !== '/auth/sign-in') {
                console.log(state.url);
                return of(false)
            }
            return of(true);
        }),
    );
};

