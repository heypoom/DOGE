import type { IItemBlueprint as Item } from '../../@types'

const DogeCoin: Item = {
  name: 'Doge Coin 🪙 🐩',
  lore: '+500% Valuation!',
  description: `10-second Immunity effect to re-position.`,

  sprite: {
    width: 60,
    height: 90,
    src: '/assets/yellowShirt.png',
  },
}

const StunGun: Item = {
  name: 'Stun Gun 🔫',
  lore: 'Zzzzzzzzzzz',
  description: `Surrounding minions in 9-block radius will cry for 9 seconds.`,

  sprite: {
    width: 60,
    height: 90,
    src: '/assets/bucket.png',
  },
}

const OrangeJuice: Item = {
  name: 'Orange Juice 🍊',
}

export const ItemRegistry = { DogeCoin, StunGun, OrangeJuice } as const

export type IItemType = keyof typeof ItemRegistry

export const getItem = (type: IItemType): Item => ItemRegistry[type]
