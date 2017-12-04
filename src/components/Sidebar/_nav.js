export default {
  items: [
    {
      name: 'Meta',
      url: '/dashboard',
      icon: 'icon-disc'
    },
    {
      name: 'Item',
      url: '/item',
      icon: 'icon-menu',
      children: [
        {
          name: 'New Item',
          url: '/item/new',
          icon: 'icon-disc'
        },
        {
          name: 'List Items',
          url: '/item/list',
          icon: 'icon-disc'
        },
        {
          name: 'Distribute Item',
          url: '/item/spawn',
          icon: 'icon-disc'
        }
      ]
    },
    {
      name: 'Lootbox',
      url: '/lootbox',
      icon: 'icon-menu',
      children: [
        {
          name: 'Add to Loot-table',
          url: '/lootbox/new',
          icon: 'icon-disc'
        },
        {
          name: 'Chances',
          url: '/lootbox/chances',
          icon: 'icon-disc'
        },
        {
          name: 'Get Items',
          url: '/lootbox/items',
          icon: 'icon-disc'
        },
        {
          name: 'Cost',
          url: '/lootbox/cost',
          icon: 'icon-disc'
        }
      ]
    },
    {
      name: 'Crafter',
      url: '/crafter',
      icon: 'icon-menu',
      children: [
        {
          name: 'List Craftables',
          url: '/crafting/list',
          icon: 'icon-disc'
        },
        {
          name: 'Crafting Recipie',
          url: '/crafting/recipie/create',
          icon: 'icon-disc'
        },
        {
          name: 'Deconstructing Recipie',
          url: '/crafting/deconstruction/create',
          icon: 'icon-disc'
        }
      ]
    },
    {
      name: 'Trade',
      url: '/trade',
      icon: 'icon-menu'
    }
  ]
};
