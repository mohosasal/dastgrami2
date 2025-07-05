// src/components/Canvas.tsx
import { Shape } from "../types"

interface Props {
    shapes: Shape[]
    onAddShape: (x: number, y: number) => void
    onRemoveShape: (id: string) => void
}

const SHAPE_SIZE = 48
const CANVAS_W = 520
const CANVAS_H = 360

export default function Canvas({ shapes, onAddShape, onRemoveShape }: Props) {
    // Get mouse coordinates relative to SVG
    const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        // Only add shape if not double clicking on a shape!
        if (e.target === e.currentTarget) {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            onAddShape(x, y)
        }
    }

    // Individual shape double-click REMOVE
    const makeRemoveHandler = (id: string) => (e: React.MouseEvent) => {
        e.stopPropagation()
        onRemoveShape(id)
    }

    return (
        <div className="flex justify-center items-center w-full h-full min-h-[400px]">
            <svg
                width={CANVAS_W}
                height={CANVAS_H}
                className="bg-gray-50 border shadow-lg rounded"
                style={{ display: "block", touchAction: "none" }}
                onClick={handleCanvasClick}
            >
                {/* Render all shapes */}
                {shapes.map(shape => {
                    switch (shape.type) {
                        case "circle":
                            return (
                                <circle
                                    key={shape.id}
                                    cx={shape.x}
                                    cy={shape.y}
                                    r={SHAPE_SIZE / 2}
                                    fill="#60a5fa"
                                    onDoubleClick={makeRemoveHandler(shape.id)}
                                    className="cursor-pointer"
                                />
                            )
                        case "square":
                            return (
                                <rect
                                    key={shape.id}
                                    x={shape.x - SHAPE_SIZE / 2}
                                    y={shape.y - SHAPE_SIZE / 2}
                                    width={SHAPE_SIZE}
                                    height={SHAPE_SIZE}
                                    fill="#facc15"
                                    onDoubleClick={makeRemoveHandler(shape.id)}
                                    className="cursor-pointer"
                                />
                            )
                        case "triangle":
                            const half = SHAPE_SIZE / 2
                            return (
                                <polygon
                                    key={shape.id}
                                    points={[
                                        `${shape.x},${shape.y - half}`,
                                        `${shape.x - half},${shape.y + half}`,
                                        `${shape.x + half},${shape.y + half}`
                                    ].join(" ")}
                                    fill="#34d399"
                                    onDoubleClick={makeRemoveHandler(shape.id)}
                                    className="cursor-pointer"
                                />
                            )
                        default:
                            return null
                    }
                })}
            </svg>
        </div>
    )
}
