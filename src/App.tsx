// src/App.tsx
import { useState } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Canvas from "./components/Canvas"
import StatusBar from "./components/StatusBar"
import type { Shape, ShapeType } from "./types"
import LoginForm from "./components/LoginForm";

export default function App() {
    const [selectedTool, setSelectedTool] = useState<ShapeType>("circle")
    const [shapes, setShapes] = useState<Shape[]>([])
    const [user, setUser] = useState<string | null>(null);

    function handleAddShape(x: number, y: number) {
        setShapes(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                type: selectedTool,
                x,
                y,
            }
        ])
    }

    function handleRemoveShape(id: string) {
        setShapes(prev => prev.filter(shape => shape.id !== id))
    }

    function handleExport() {
        const json = JSON.stringify(shapes, null, 2)
        const blob = new Blob([json], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "shapes.json"
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
    }

    function handleImport(imported: Shape[]) {
        if (Array.isArray(imported)) {
            const valid = imported.every(
                s => s && typeof s.id === "string" &&
                    (s.type === "circle" || s.type === "square" || s.type === "triangle") &&
                    typeof s.x === "number" && typeof s.y === "number")
            if (valid) setShapes(imported)
            else alert("Invalid shapes in file!")
        } else {
            alert("Invalid file format.")
        }
    }

    async function handleSaveToServer() {
        if (!user) return;
        await fetch(
            `http://localhost:8080/api/drawing/${user}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(shapes)
            }
        )
        alert("Saved to server!");
    }

    async function handleLoadFromServer() {
        if (!user) return;
        let resp = await fetch(`http://localhost:8080/api/drawing/${user}`)
        if (resp.ok) {
            const shapes = await resp.json()
            setShapes(shapes)
            alert("Loaded from server!")
        } else {
            alert("No drawing found for this user.")
        }
    }

    if (!user) {
        return <LoginForm onLogin={setUser} />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header onExport={handleExport} onImport={handleImport}   onSaveToServer={handleSaveToServer}
                    onLoadFromServer={handleLoadFromServer} />
            <div className="flex flex-1">
                <Sidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
                <main className="flex-1 flex justify-center items-center bg-white">
                    <Canvas shapes={shapes}
                            onAddShape={handleAddShape}
                            onRemoveShape={handleRemoveShape}
                    />
                </main>
            </div>
            <StatusBar shapes={shapes} />
        </div>
    )
}
