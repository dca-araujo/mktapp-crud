export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-graph'
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Menu']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Clientes',
    route: '/clientes',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Cadastrados',
        to: '/clientes/lista',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Notificações',
        to: '/clientes/notifica',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Empresa',
    route: '/empresa',
    icon: 'cil-building',
    _children: [
    //   {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Fale Conosco',
    //     to: '/empresa/fale',
    //   },
      {
        _tag: 'CSidebarNavItem',
        name: 'Quem somos',
        to: '/empresa',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Produtos',
    route: '/produtos',
    icon: 'cil-cart',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Cupons',
        to: '/produtos/cupons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Promoções',
        to: '/produtos/promocoes',
      }
    ],
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Administrador']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Configurações',
    route: '/base',
    icon: 'cil-cog',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Usuários',
        to: '/base/fale',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

