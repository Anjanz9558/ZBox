import { Component, DestroyRef, inject, OnInit, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';

import { AdminLayoutService } from './layout/admin-layout/admin-layout.service';
import { DOCUMENT } from '@angular/common';
import { CommonService } from './shared/common.service';
import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  template: `
  <app-loader />
  <router-outlet />
  `,
  imports: [RouterOutlet, LoaderComponent]
})
export class AppComponent implements OnInit {
  title = 'ZBox | Welcome';

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);
  readonly #document = inject(DOCUMENT);
  constructor(private AdminLayoutService: AdminLayoutService,
    public commonService: CommonService,
  ) {


    this.#titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.#router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
          let route = this.#activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        map(route => route.snapshot.data['title']),
        tap((pageTitle: string) => {
          if (pageTitle) {
            this.#titleService.setTitle(`ZBox | ${pageTitle}`);
          } else {
            this.#titleService.setTitle('ZBox');
          }
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  setFavicon(faviconUrl: string): void {
    let link = this.#document.getElementById('dynamic-favicon') as HTMLLinkElement;

    if (!link) {
      link = this.#document.createElement('link');
      link.id = 'dynamic-favicon';
      link.rel = 'icon';
      link.type = 'image/x-icon';
      this.#document.head.appendChild(link);
    }

    link.href = faviconUrl;
  }

}
