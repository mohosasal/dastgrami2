import { ShapeType } from '../types'
interface Props {
    selectedTool: ShapeType
    setSelectedTool: (type: ShapeType) => void
}

const toolList: {type: ShapeType, label: string, icon: JSX.Element}[] = [
    {
        type: 'circle', label: 'Circle',
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor"><circle cx="16" cy="16" r="12" strokeWidth="2" x="0" y="0" /></svg>
    },
    {
        type: 'square', label: 'Square',
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor"><rect x="6" y="6" width="20" height="20" strokeWidth="2"/></svg>
    },
    {
        type: 'triangle', label: 'Triangle',
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor"><polygon points="16,6 26,26 6,26" strokeWidth="2" /></svg>
    },
]

const Sidebar = ({ selectedTool, setSelectedTool }: Props) => (
    <aside className="w-32 bg-white shadow p-4 flex flex-col items-center">
        <div className="font-semibold mb-4">Tools</div>
        <div className="flex flex-col gap-4">
            {toolList.map(tool => (
                <button
                    key={tool.type}
                    className={`border rounded-lg p-2 flex flex-col items-center transition ${selectedTool === tool.type ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedTool(tool.type)}
                >
                    {tool.icon}
                    <span className="text-xs mt-1">{tool.label}</span>
                </button>
            ))}
        </div>
    </aside>
)

export default Sidebar
