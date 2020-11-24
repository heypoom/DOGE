export interface IAttack {
  minDamage: number
  maxDamage: number
}

export interface IDefense {
  armor: number
}

export interface IItem {
  attack?: IAttack
  defense?: IDefense
}
