import { DOCUMENT, NgIf } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FuseConfig, FuseConfigService } from '@fuse/services/config';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FusePlatformService } from '@fuse/services/platform';
import { FUSE_VERSION } from '@fuse/version';
import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';
import { EmptyLayoutComponent } from './layouts/empty/empty.component';


import { DenseLayoutComponent } from './layouts/dense/dense.component';
import { AuthService } from 'app/core/auth/auth.service';
import { SettingsComponent } from 'app/shared/components/common/settings/settings.component';
import { UserService } from 'app/core/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';


@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgIf, EmptyLayoutComponent, DenseLayoutComponent, SettingsComponent],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  currentMerchant: any;
  isAthenticated: boolean;
  config: FuseConfig;
  layout: string = 'dense';
  scheme: 'dark' | 'light';
  theme: string;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private authServices: AuthService,
    private userService: UserService,
    private _activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private _document: any,
    private _renderer2: Renderer2,
    private _router: Router,
    private _fuseConfigService: FuseConfigService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fusePlatformService: FusePlatformService,
    private loader: FuseSplashScreenService
  ) {
    
  }

  ngAfterViewInit(): void {
    if (this.authServices.accessToken) {
    this.loader.show();
      let curUser: any = jwtDecode(this.authServices.accessToken);
      this.authServices.getMerchantById(curUser.merchantId).subscribe((res: any) => {
        if (res.success) {
          this.currentMerchant = res.data;
          this.loader.hide();
        }
      })
    }
  }
  ngOnInit(): void {
    this.isAthenticated = this.authServices.accessToken ? true : false
    combineLatest([
      this._fuseConfigService.config$,
      this._fuseMediaWatcherService.onMediaQueryChange$(['(prefers-color-scheme: dark)', '(prefers-color-scheme: light)']),
    ]).pipe(
      takeUntil(this._unsubscribeAll),
      map(([config, mql]) => {
        const options = {
          scheme: config.scheme,
          theme: config.theme,
        };
        if (config.scheme === 'auto') {
          options.scheme = mql.breakpoints['(prefers-color-scheme: dark)'] ? 'dark' : 'light';
        }

        return options;
      }),
    ).subscribe((options) => {
      // Store the options
      this.scheme = options.scheme;
      this.theme = options.theme;

      // Update the scheme and theme
      this._updateScheme();
      this._updateTheme();
    });

    // Subscribe to config changes
    this._fuseConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: FuseConfig) => {
        // Store the config
        this.config = config;

        // Update the layout
        this._updateLayout();
      });

    // Subscribe to NavigationEnd event
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this._unsubscribeAll),
    ).subscribe(() => {
      // Update the layout
      this._updateLayout();
    });

    // Set the app version
    this._renderer2.setAttribute(this._document.querySelector('[ng-version]'), 'fuse-version', FUSE_VERSION);

    // Set the OS name
    this._renderer2.addClass(this._document.body, this._fusePlatformService.osName);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  private _updateLayout(): void {
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    this.layout = this.config.layout = 'dense';

    // 2. Get the query parameter from the current route and
    // set the layout and save the layout to the config
    const layoutFromQueryParam = route.snapshot.queryParamMap.get('layout');
    if (layoutFromQueryParam) {
      this.layout = layoutFromQueryParam;
      if (this.config) {
        this.config.layout = layoutFromQueryParam;
        this.config.layout = layoutFromQueryParam;
      }
    }

    // 3. Iterate through the paths and change the layout as we find
    // a config for it.
    //
    // The reason we do this is that there might be empty grouping
    // paths or componentless routes along the path. Because of that,
    // we cannot just assume that the layout configuration will be
    // in the last path's config or in the first path's config.
    //
    // So, we get all the paths that matched starting from root all
    // the way to the current activated route, walk through them one
    // by one and change the layout as we find the layout config. This
    // way, layout configuration can live anywhere within the path and
    // we won't miss it.
    //
    // Also, this will allow overriding the layout in any time so we
    // can have different layouts for different routes.
    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      // Check if there is a 'layout' data
      if (path.routeConfig && path.routeConfig.data && path.routeConfig.data.layout) {
        // Set the layout
        this.layout = path.routeConfig.data.layout;
      }
    });
  }

  private _updateScheme(): void {
    // Remove class names for all schemes
    this._document.body.classList.remove('light', 'dark');

    // Add class name for the currently selected scheme
    this._document.body.classList.add(this.scheme);
  }

  private _updateTheme(): void {
    // Find the class name for the previously selected theme and remove it
    this._document.body.classList.forEach((className: string) => {
      if (className.startsWith('theme-')) {
        this._document.body.classList.remove(className, className.split('-')[1]);
      }
    });

    // Add class name for the currently selected theme
    this._document.body.classList.add(this.theme);
  }
}
