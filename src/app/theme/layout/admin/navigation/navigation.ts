import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
    ],
  },
  {
    id: 'user',
    title: 'user',
    type: 'group',
    icon: 'icon-user',
    children: [
      {
        id: 'add user',
        title: 'add user',
        type: 'item',
        url: '/addUser',
        icon: 'feather icon-user-plus',
        classes: 'nav-item',
        role: "ROLE_ADMIN"
      },
      {
        id: 'users',
        title: 'users',
        type: 'item',
        url: '/users',
        icon: 'feather icon-users',
        classes: 'nav-item',
        role: "ROLE_ADMIN"
      },
    ]
  },
  {
    id: 'client',
    title: 'client',
    type: 'group',
    icon: 'icon-client',
    children: [
      {
        id: 'add client',
        title: 'add client',
        type: 'item',
        url: '/addClient',
        icon: 'feather icon-user-plus',
        classes: 'nav-item',
      },
      {
        id: 'clients',
        title: 'clients',
        type: 'item',
        url: '/clients',
        icon: 'feather icon-users',
        classes: 'nav-item',
      }
    ]
  },
  {
    id: 'sale',
    title: 'sale',
    type: 'group',
    icon: 'icon-sale',
    children: [
      {
        id: 'add sale',
        title: 'add sale',
        type: 'item',
        url: '/addSale',
        icon: 'feather icon-shopping-cart',
        classes: 'nav-item',
      },
      {
        id: 'sales',
        title: 'sales',
        type: 'item',
        url: '/sales',
        icon: 'feather icon-shopping-cart',
        classes: 'nav-item',
      }
    ]
  },
  {
    id: 'transaction',
    title: 'transaction',
    type: 'group',
    icon: 'icon-transaction',
    children: [
      {
        id: 'add transaction',
        title: 'add transaction',
        type: 'item',
        url: '/addTransaction',
        icon: 'feather icon-chevron-up',
        classes: 'nav-item',
      },
      {
        id: 'transactions',
        title: 'transactions',
        type: 'item',
        url: '/transactions',
        icon: 'feather icon-chevrons-up',
        classes: 'nav-item',
      }
    ]
  },
  {
    id: 'payment reversal',
    title: 'payment reversal',
    type: 'group',
    icon: 'icon-payment-reversal',
    children: [
      {
        id: 'add payment reversal',
        title: 'add payment reversal',
        type: 'item',
        url: '/addPaymentReversal',
        icon: 'feather icon-arrow-left',
        classes: 'nav-item',
      },
      {
        id: 'payment reversals',
        title: 'payment reversals',
        type: 'item',
        url: '/paymentReversal',
        icon: 'feather icon-arrow-left',
        classes: 'nav-item',
      }
    ]
  },
  {
    id: 'accounting',
    title: 'accounting',
    type: 'group',
    icon: 'icon-accounting',
    children: [
      {
        id: 'client credit',
        title: 'client credit',
        type: 'item',
        url: '/clientCredit',
        icon: 'feather icon-arrow-left',
        classes: 'nav-item',
      },
      {
        id: 'client debit',
        title: 'client debit',
        type: 'item',
        url: '/clientDebit',
        icon: 'feather icon-arrow-left',
        classes: 'nav-item',
      },
      {
        id: 'client sold',
        title: 'client sold',
        type: 'item',
        url: '/clientSold',
        icon: 'feather icon-arrow-left',
        classes: 'nav-item',
      }
    ]
  },
  // {
  //   id: 'ui-element',
  //   title: 'UI ELEMENT',
  //   type: 'group',
  //   icon: 'icon-ui',
  //   children: [
  //     {
  //       id: 'basic',
  //       title: 'Component',
  //       type: 'collapse',
  //       icon: 'feather icon-box',
  //       children: [
  //         {
  //           id: 'button',
  //           title: 'Button',
  //           type: 'item',
  //           url: '/basic/button',
  //         },
  //         {
  //           id: 'badges',
  //           title: 'Badges',
  //           type: 'item',
  //           url: '/basic/badges',
  //         },
  //         {
  //           id: 'breadcrumb-pagination',
  //           title: 'Breadcrumb & Pagination',
  //           type: 'item',
  //           url: '/basic/breadcrumb-paging',
  //         },
  //         {
  //           id: 'collapse',
  //           title: 'Collapse',
  //           type: 'item',
  //           url: '/basic/collapse',
  //         },
  //         {
  //           id: 'tabs-pills',
  //           title: 'Tabs & Pills',
  //           type: 'item',
  //           url: '/basic/tabs-pills',
  //         },
  //         {
  //           id: 'typography',
  //           title: 'Typography',
  //           type: 'item',
  //           url: '/basic/typography',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'forms',
  //   title: 'Forms & Tables',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'forms-element',
  //       title: 'Form Elements',
  //       type: 'item',
  //       url: '/forms/basic',
  //       classes: 'nav-item',
  //       icon: 'feather icon-file-text',
  //     },
  //     {
  //       id: 'tables',
  //       title: 'Tables',
  //       type: 'item',
  //       url: '/tables/bootstrap',
  //       classes: 'nav-item',
  //       icon: 'feather icon-server',
  //     },
  //   ],
  // },
  // {
  //   id: 'chart-maps',
  //   title: 'Chart',
  //   type: 'group',
  //   icon: 'icon-charts',
  //   children: [
  //     {
  //       id: 'apexChart',
  //       title: 'ApexChart',
  //       type: 'item',
  //       url: 'apexchart',
  //       classes: 'nav-item',
  //       icon: 'feather icon-pie-chart',
  //     },
  //   ],
  // },
  // {
  //   id: 'pages',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-pages',
  //   children: [
  //     {
  //       id: 'auth',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'feather icon-lock',
  //       children: [
  //         {
  //           id: 'signup',
  //           title: 'Sign up',
  //           type: 'item',
  //           url: '/auth/signup',
  //           target: true,
  //           breadcrumbs: false,
  //         },
  //         {
  //           id: 'signin',
  //           title: 'Sign in',
  //           type: 'item',
  //           url: '/auth/signin',
  //           target: true,
  //           breadcrumbs: false,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar',
  //     },
  //     {
  //       id: 'disabled-menu',
  //       title: 'Disabled Menu',
  //       type: 'item',
  //       url: 'javascript:',
  //       classes: 'nav-item disabled',
  //       icon: 'feather icon-power',
  //       external: true,
  //     },
  //     {
  //       id: 'buy_now',
  //       title: 'Buy Now',
  //       type: 'item',
  //       icon: 'feather icon-book',
  //       classes: 'nav-item',
  //       url: 'https://codedthemes.com/item/datta-able-angular/',
  //       target: true,
  //       external: true,
  //     },
  //   ],
  // },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}