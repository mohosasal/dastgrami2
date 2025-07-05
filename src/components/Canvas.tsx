import { Shape } from '../types'

interface Props {
    shapes: Shape[]
    onAddShape: (x: number, y: number) => void
    onRemoveShape: (id: string) => void
}

const CANVAS_W = 600
const CANVAS_H = 400
const SHAPE_SIZE = 48

const Canvas = ({ shapes, onAddShape, onRemoveShape }: Props) => {
    function handleCanvasClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        onAddShape(x, y)
    }

    return (
        <main className="flex-1 flex justify-center items-center bg-gray-200 m-4 p-4 rounded shadow">
            <svg
                width={CANVAS_W}
                height={CANVAS_H}
                className="bg-white rounded border"
                onClick={handleCanvasClick}
                style={{ cursor: 'crosshair', display: 'block' }}
            >
                {/* Render shapes */}
                {shapes.map(shape => {
                    if (shape.type === 'circle') {
                        return (
                            <circle
                                key={shape.id}
                                cx={shape.x}
                                cy={shape.y}
                                r={SHAPE_SIZE / 2}
                                fill="#93c5fd"
                                stroke="#2563eb"
                                strokeWidth={2}
                                onDoubleClick={e => {
                                    e.stopPropagation()
                                    onRemoveShape(shape.id)
                                }}
                                style={{ cursor: 'pointer' }}
                            />
                        )
                    }
                    if (shape.type === 'square') {
                        return (
                            <rect
                                key={shape.id}
                                x={shape.x - SHAPE_SIZE / 2}
                                y={shape.y - SHAPE_SIZE / 2}
                                width={SHAPE_SIZE}
                                height={SHAPE_SIZE}
                                fill="#fbbf24"
                                stroke="#d97706"
                                strokeWidth={2}
                                onDoubleClick={e => {
                                    e.stopPropagation()
                                    onRemoveShape(shape.id)
                                }}
                                style={{ cursor: 'pointer' }}
                            />
                        )
                    }
                    if (shape.type === 'triangle') {
                        const h = SHAPE_SIZE * Math.sqrt(3) / 2
                        const points = [
                            `${shape.x},${shape.y - h / 2}`,
                            `${shape.x - SHAPE_SIZE / 2},${shape.y + h / 2}`,
                            `${shape.x + SHAPE_SIZE / 2},${shape.y + h / 2}`
                        ].join(' ')
                        return (
                            <polygon
                                key={shape.id}
                                points={points}
                                fill="#6ee7b7"
                                stroke="#059669"
                                strokeWidth={2}
                                onDoubleClick={e => {
                                    e.stopPropagation()
                                    onRemoveShape(shape.id)
                                }}
                                style={{ cursor: 'pointer' }}
                            />
                        )
                    }
                    return null
                })}
            </svg>
        </main>
    )
}

export default Canvas
