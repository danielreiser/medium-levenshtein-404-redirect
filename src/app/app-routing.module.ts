import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProfileComponent } from './pages/profile/profile.component'
import { AccountDataComponent } from './pages/account-data/account-data.component'
import { PrivacySettingsComponent } from './pages/privacy-settings/privacy-settings.component'
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component'
import { paths } from './paths'
import { Redirect404Guard } from './guards/redirect-404.guard'
import { NotFoundComponent } from './pages/not-found/not-found.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: paths.profile
  },
  {
    path: paths.profile,
    component: ProfileComponent
  },
  {
    path: paths.accountData,
    component: AccountDataComponent
  },
  {
    path: paths.privacySettings,
    component: PrivacySettingsComponent
  },
  {
    path: paths.paymentMethods,
    component: PaymentMethodsComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    canActivate: [Redirect404Guard],
    children: [],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
