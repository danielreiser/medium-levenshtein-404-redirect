import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { distance } from 'fastest-levenshtein'
import { paths } from '../paths'

@Injectable({
  providedIn: 'root'
})
export class Redirect404Guard implements CanActivate {
  private readonly MAX_DISTANCE = 2

  constructor(private _router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const path = state.url.substr(1)
    if (!Object.values(paths).includes(path)) {
      console.group('Trying to prevent 404')
      console.log(`[INFO] Path ${path} could not be found.`)
      return this._closestPathname(path)
    }

    return true
  }


  private _closestPathname(inputPath: string): UrlTree | boolean {
    console.log(`[INFO] Trying to find the closest route...`)

    const potentialRoutes = Object.entries(paths)
      .map(([routeKey, route]) => ({ [routeKey]: distance(inputPath, route) }))
      .sort((routeA: { [k: string]: number }, routeB: { [k: string]: number }) => {
        const distanceA = Object.values(routeA)[0]
        const distanceB = Object.values(routeB)[0]

        if (distanceA < distanceB) {
          return -1
        } else if (distanceA > distanceB) {
          return 1
        }

        return 0
      })
      .filter(route => Object.values(route)[0] <= this.MAX_DISTANCE)
      .map(route => route && paths[Object.keys(route)[0]])

    if (potentialRoutes[0]) {
      console.log(`[INFO] Found ${potentialRoutes[0]}. Redirecting...`)
      console.groupEnd()
      return this._router.parseUrl(potentialRoutes[0])
    }

    console.log(`[INFO] Couldn't fine any matching routes. Redirecting to 404 (not-found)`)
    console.groupEnd()
    return this._router.parseUrl('not-found')
  }

}
