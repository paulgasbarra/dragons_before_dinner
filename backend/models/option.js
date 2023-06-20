/* Option schema
type Option {
  description: string
  shortName: string
  attribute: string
  threshold: number
  reward: Treasure[]
  penalty: {
    name: string
    value: number
  }
}
*/