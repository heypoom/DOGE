import type { IItemBlueprint as Item } from '../../@types'

const yellowShirt: Item = {
  name: 'Yellow Shirt',
  lore: 'ใส่แล้วจะเป็นคนดีขึ้นมาทันที',
  description: `10-second Immunity effect to blend in and re-position. They'll notice immediately if you use a colorful paint, though!`,

  sprite: {
    width: 60,
    height: 90,
    src: '/assets/minions.png',
  },
}

const lateKingPhoto: Item = {
  name: "Late King's Photo",
  lore: 'เมื่อได้เห็นพระบารมี ก็ยิ้มทั้งน้ำตา',
  description: `Surrounding minions in 9-block radius will cry for 9 seconds.`,
}

const orangeJuice: Item = {
  name: 'Orange Juice',
}

export const ItemRegistry = { yellowShirt, lateKingPhoto, orangeJuice } as const

export type IItemType = keyof typeof ItemRegistry

export const getItem = (type: IItemType): Item => ItemRegistry[type]
