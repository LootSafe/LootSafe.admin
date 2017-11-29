export default {
  items: [
    {
      name: 'Meta',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Item',
      url: '/item',
      icon: 'icon-speedometer',
      children: [
        {
          name: 'New Item',
          url: '/item/new',
          icon: 'icon-speedometer'
        },
        {
          name: 'List Items',
          url: '/item/list',
          icon: 'icon-speedometer'
        },
        {
          name: 'Get Item',
          url: '/item/get',
          icon: 'icon-speedometer'
        },
        {
          name: 'Spawn Item',
          url: '/item/spawn',
          icon: 'icon-speedometer'
        },
        {
          name: 'Delist Item',
          url: '/item/new',
          icon: 'icon-speedometer'
        }
      ]
    },
    {
      name: 'Lootbox',
      url: '/lootbox',
      icon: 'icon-speedometer',
      children: [
        {
          name: 'Chances',
          url: '/lootbox/chances',
          icon: 'icon-speedometer'
        },
        {
          name: 'Get Items',
          url: '/lootbox/items',
          icon: 'icon-speedometer'
        },
        {
          name: 'Cost',
          url: '/lootbox/cost',
          icon: 'icon-speedometer'
        },
        {
          name: 'New Item',
          url: '/lootbox/new',
          icon: 'icon-speedometer'
        }
      ]
    },
    {
      name: 'Crafter',
      url: '/crafter',
      icon: 'icon-speedometer'
    },
    {
      name: 'Trade',
      url: '/trade',
      icon: 'icon-speedometer'
    }
  ]
};
