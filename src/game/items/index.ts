import type { IItemBlueprint as Item } from '../../@types'

const DogeCoin: Item = {
  name: 'Doge Coin 🪙 🐩',
  lore: 'ใส่แล้วจะเป็นคนดีขึ้นมาทันที!',
  description: `10-second Immunity effect to blend in and re-position. They'll notice immediately if you use a colorful paint, though!`,

  sprite: {
    width: 60,
    height: 90,
    src: '/assets/yellowShirt.png',
  },
}

const StunGun: Item = {
  name: 'Stun Gun 🔫',
  lore: '',
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
