import type { IItemBlueprint as Item } from '../../@types'

const yellowShirt: Item = {
  name: 'Yellow Shirt 👕',
  lore: 'ใส่แล้วจะเป็นคนดีขึ้นมาทันที!',
  description: `10-second Immunity effect to blend in and re-position. They'll notice immediately if you use a colorful paint, though!`,

  sprite: {
    width: 60,
    height: 90,
    src: '/assets/yellowshirt.png',
  },
}

const lateKingPhoto: Item = {
  name: "มิตรสหายท่านหนึ่ง's Photo",
  lore: '',
  description: `Surrounding minions in 9-block radius will cry for 9 seconds.`,

  sprite: {
    width: 60,
    height: 90,
    src: '/assets/bucket.png',
  },
}

const orangeJuice: Item = {
  name: 'Orange Juice',
}

const container: Item = {
  name: 'ตู้คอนเทนเนอร์',
  description: '',
}

export const ItemRegistry = { yellowShirt, lateKingPhoto, orangeJuice } as const

export type IItemType = keyof typeof ItemRegistry

export const getItem = (type: IItemType): Item => ItemRegistry[type]
