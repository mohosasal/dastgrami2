import { Shape } from '../types'

interface Props {
    shapes: Shape[]
}

const Canvas = ({ shapes }: Props) => (
    <main className="flex-1 bg-gray-200 m-4 p-4 rounded shadow relative">
        <div className="text-gray-500 text-center">Canvas Area</div>
    </main>
)

export default Canvas
