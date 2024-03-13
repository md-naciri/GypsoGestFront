import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { UserComponent } from './demo/user/user.component';
import { AdduserComponent } from './demo/user/adduser/adduser.component';
import { AuthGuard } from './demo/pages/authentication/guards/auth.guard';
import { ClientComponent } from './demo/client/client.component';
import { AdminGuard } from './demo/user/admin.guard';
import { AddclientComponent } from './demo/client/addclient/addclient.component';
import { AddsaleComponent } from './demo/sale/addsale/addsale.component';
import { SaleComponent } from './demo/sale/sale.component';
import { TransactionComponent } from './demo/transaction/transaction.component';
import { AddtransactionComponent } from './demo/transaction/addtransaction/addtransaction.component';
import { AddpaymentReversalComponent } from './demo/payment-reversal/addpayment-reversal/addpayment-reversal.component';
import { PaymentReversalComponent } from './demo/payment-reversal/payment-reversal.component';
import { ClientCreditComponent } from './demo/accounting/client-credit/client-credit.component';
import { ClientDebitComponent } from './demo/accounting/client-debit/client-debit.component';
import { ClientSoldComponent } from './demo/accounting/client-sold/client-sold.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component'),
      },
      {
        path: 'basic',
        loadChildren: () =>
          import('./demo/ui-elements/ui-basic/ui-basic.module').then(
            (m) => m.UiBasicModule,
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./demo/pages/form-elements/form-elements.module').then(
            (m) => m.FormElementsModule,
          ),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./demo/pages/tables/tables.module').then(
            (m) => m.TablesModule,
          ),
      },
      {
        path: 'apexchart',
        loadComponent: () =>
          import('./demo/chart/apex-chart/apex-chart.component'),
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/extra/sample-page/sample-page.component'),
      },
      {
        path:'users',component:UserComponent,
        canActivate: [AdminGuard]
      },
      {
        path:'addUser',component:AdduserComponent,
        canActivate: [AdminGuard]
      },
      {
        path:'clients',component:ClientComponent
      },
      {
        path:'addClient',component:AddclientComponent
      },
      {
        path:'addSale', component: AddsaleComponent
      },
      {
        path:'sales', component: SaleComponent
      },
      {
        path:'transactions', component: TransactionComponent
      },
      {
        path:'addTransaction', component: AddtransactionComponent
      },
      {
        path:'addPaymentReversal', component: AddpaymentReversalComponent
      },
      {
        path:'paymentReversal', component: PaymentReversalComponent
      },
      {
        path: 'clientCredit', component: ClientCreditComponent
      },
      {
        path: 'clientDebit', component: ClientDebitComponent
      },
      {
        path: 'clientSold', component: ClientSoldComponent
      }
    ]
    ,
    canActivate: [AuthGuard]
  },
   

  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
