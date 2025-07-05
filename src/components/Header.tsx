import React from 'react'
import { Shape } from '../types'

interface Props {
    onExport: () => void
    onImport: (shapes: Shape[]) => void
}

const Header = ({ onExport, onImport }: Props) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                try {
                    const shapes = JSON.parse(reader.result as string) as Shape[]
                    onImport(shapes)
                } catch {
                    alert('Invalid file format. Please upload a valid JSON file.')
                }
            }
            reader.readAsText(file)
        }
        e.target.value = ''
    }

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">Painting Title</h1>
            <div className="flex gap-4">
                <button
                    onClick={onExport}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Export
                </button>
                <label className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer">
                    Import
                    <input
                        type="file"
                        accept="application/json"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            </div>
        </header>
    )
}

export default Header
