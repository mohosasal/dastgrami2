import { ShapeType } from "../types"

interface Props {
    selectedTool: ShapeType
    setSelectedTool: (tool: ShapeType) => void
}

const tools: { type: ShapeType, icon: JSX.Element, label: string }[] = [
    {
        type: "circle",
        icon: <svg width={24} height={24}><circle cx={12} cy={12} r={8} fill="#60a5fa" /></svg>,
        label: "Circle"
    },
    {
        type: "square",
        icon: <svg width={24} height={24}><rect x={5} y={5} width={14} height={14} fill="#facc15" /></svg>,
        label: "Square"
    },
    {
        type: "triangle",
        icon: (
            <svg width={24} height={24}><polygon points="12,5 20,19 4,19" fill="#34d399" /></svg>
        ),
        label: "Triangle"
    },
]

export default function Sidebar({ selectedTool, setSelectedTool }: Props) {
    return (
        <aside className="w-32 bg-gray-100 border-r py-8 flex flex-col items-center gap-6">
            <div className="text-sm font-bold text-gray-500 mb-6">Tools</div>
            {tools.map(tool => (
                <button
                    key={tool.type}
                    className={`flex flex-col items-center justify-center gap-1 p-2 rounded border transition
            ${selectedTool === tool.type
                        ? "bg-blue-100 border-blue-500"
                        : "hover:bg-gray-200 border-transparent"}
          `}
                    onClick={() => setSelectedTool(tool.type)}
                >
                    {tool.icon}
                    <span className="text-xs">{tool.label}</span>
                </button>
            ))}
        </aside>
    )
}
