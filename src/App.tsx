import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import StatusBar from './components/StatusBar'
import type { Shape, ShapeType } from './types'

function App() {
    const [selectedTool, setSelectedTool] = useState<ShapeType>('circle')
    const [shapes, setShapes] = useState<Shape[]>([])

    function handleAddShape(x: number, y: number) {
        setShapes(prevShapes => [
            ...prevShapes,
            {
                id: crypto.randomUUID(),
                type: selectedTool,
                x,
                y,
            }
        ])
    }

    function handleRemoveShape(id: string) {
        setShapes(prevShapes => prevShapes.filter(shape => shape.id !== id))
    }

    function handleExport() {
        const json = JSON.stringify(shapes, null, 2)
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'shapes.json'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    function handleImport(importedShapes: Shape[]) {
        if (Array.isArray(importedShapes)) {
            const isValid = importedShapes.every(shape =>
                shape &&
                typeof shape.id === 'string' &&
                ['circle', 'square', 'triangle'].includes(shape.type) &&
                typeof shape.x === 'number' &&
                typeof shape.y === 'number'
            )
            if (isValid) {
                setShapes(importedShapes)
            } else {
                alert('Invalid shape data in the file.')
            }
        } else {
            alert('Invalid file format. Please upload a valid JSON file.')
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header onExport={handleExport} onImport={handleImport} />
            <div className="flex flex-1">
                <Sidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
                <Canvas shapes={shapes} onAddShape={handleAddShape} onRemoveShape={handleRemoveShape} />
            </div>
            <StatusBar shapes={shapes} />
        </div>
    )
}

export default App
