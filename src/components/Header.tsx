// src/components/Header.tsx
import React from "react"
import { Shape } from "../types"

interface Props {
    onExport: () => void
    onImport: (shapes: Shape[]) => void
    onSaveToServer: () => void;
    onLoadFromServer: () => void;
}

const Header: React.FC<Props> = ({ onExport, onImport,  onSaveToServer, onLoadFromServer }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                try {
                    const shapes = JSON.parse(reader.result as string)
                    onImport(shapes)
                } catch (err) {
                    alert("Failed to read file")
                }
            }
            reader.readAsText(file)
            e.target.value = "" // allow re-import
        }
    }

    return (
        <header className="bg-white shadow flex items-center px-6 py-3 justify-between border-b">
            <div className="text-xl font-bold text-gray-800 select-none">Painting Title</div>
            <div className="flex items-center space-x-3">
                <button
                    onClick={onExport}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                    Export
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={onSaveToServer}>
                    Save to Server
                </button>
                <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={onLoadFromServer}>
                    Load from Server
                </button>
                <label
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer transition">
                    Import
                    <input type="file" accept="application/json"
                           className="hidden"
                           onChange={handleFileChange}
                    />
                </label>
            </div>
        </header>
    )
}

export default Header
