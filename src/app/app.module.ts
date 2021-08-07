import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { AccountDataComponent } from './pages/account-data/account-data.component';
import { PrivacySettingsComponent } from './pages/privacy-settings/privacy-settings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentMethodsComponent,
    AccountDataComponent,
    PrivacySettingsComponent,
    ProfileComponent,
    LayoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
