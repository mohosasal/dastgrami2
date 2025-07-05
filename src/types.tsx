export type ShapeType = 'circle' | 'square' | 'triangle'

export interface Shape {
    id: string
    type: ShapeType
    x: number // Position X
    y: number // Position Y
}
