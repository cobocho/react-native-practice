export type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE'

export type Category = {
  [key in MarkerColor]: string
}
