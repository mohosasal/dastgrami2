// src/App.tsx

import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import StatusBar from './components/StatusBar'
import type { Shape, ShapeType } from './types'

function App() {
    const [selectedTool, setSelectedTool] = useState<ShapeType>('circle')
    const [shapes, setShapes] = useState<Shape[]>([])

    // Add shape at given position
    function handleAddShape(x: number, y: number) {
        setShapes(prevShapes => [
            ...prevShapes,
            {
                id: crypto.randomUUID(),
                type: selectedTool,
                x, y,
            }
        ])
    }

    function handleRemoveShape(id: string) {
        setShapes(prev => prev.filter(s => s.id !== id))
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="flex flex-1">
                <Sidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
                <Canvas
                    shapes={shapes}
                    onAddShape={handleAddShape}
                    onRemoveShape={handleRemoveShape}
                />
            </div>
            <StatusBar shapes={shapes} />
        </div>
    )
}

export default App
