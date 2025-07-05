// src/components/StatusBar.tsx
import { Shape } from "../types"

interface Props {
    shapes: Shape[]
}

export default function StatusBar({ shapes }: Props) {
    const circle = shapes.filter(s => s.type === "circle").length
    const square = shapes.filter(s => s.type === "square").length
    const triangle = shapes.filter(s => s.type === "triangle").length

    return (
        <footer className="bg-white border-t px-6 py-2 flex justify-between items-center text-gray-700 text-sm shadow">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-1">
                    <svg width={18} height={18}><circle cx={9} cy={9} r={8} fill="#60a5fa" /></svg>
                    <span>Circle: {circle}</span>
                </div>
                <div className="flex items-center gap-1">
                    <svg width={18} height={18}><rect x={3} y={3} width={12} height={12} fill="#facc15" /></svg>
                    <span>Square: {square}</span>
                </div>
                <div className="flex items-center gap-1">
                    <svg width={18} height={18}><polygon points="9,3 15,15 3,15" fill="#34d399" /></svg>
                    <span>Triangle: {triangle}</span>
                </div>
            </div>
            <div className="font-semibold text-gray-700">Total: {shapes.length}</div>
        </footer>
    )
}
