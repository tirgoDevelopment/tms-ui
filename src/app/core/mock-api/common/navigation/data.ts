/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: 'orders',
    title: 'Управление заказами',
    type: 'collapsable',
    icon: 'cargo-box.svg',
    children: [
      {
        id: 'available-order',
        title: 'Доступные заказы',
        type: 'basic',
        link: '/orders/available',
      },
      {
        id: 'active-order',
        title: 'Активные заказы',
        type: 'basic',
        link: '/orders/active',
      },
      {
        id: 'archive-order',
        title: 'Архивные заказы',
        type: 'basic',
        link: '/orders/archived',
      },
    ]
  },
  {
    id: 'drivers',
    title: 'Перевозчики',
    type: 'collapsable',
    icon: 'orders.svg',
    link: '/drivers',
    children: [
      {
        id: 'active-driver',
        title: 'Активные перевозчики',
        type: 'basic',
        link: '/drivers/active',
      },
      {
        id: 'archive-driver',
        title: 'Архивные перевозчики',
        type: 'basic',
        link: '/drivers/archived',
      }
    ]
  },
  {
    id: 'settings',
    title: 'Настройки',
    type: 'basic',
    icon: 'settings.svg',
    link: '/settings',
  },
  {
    id: 'support',
    title: 'Тех.поддержка',
    type: 'basic',
    icon: 'support.svg',
    link: '/support',
  }
];

