import { Shape } from '../types'

interface Props {
    shapes: Shape[]
}

const StatusBar = ({ shapes }: Props) => {
    const circleCount = shapes.filter(shape => shape.type === 'circle').length
    const squareCount = shapes.filter(shape => shape.type === 'square').length
    const triangleCount = shapes.filter(shape => shape.type === 'triangle').length

    return (
        <footer className="bg-gray-100 border-t py-2 px-4 flex justify-between items-center
                      text-sm text-gray-700 shadow-inner">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-blue-400 border border-blue-700 inline-block"></span>
                    <span>Circle: {circleCount}</span>
                </div>
                <div className="flex items-center gap-1">
          <span className="w-4 h-4 bg-yellow-400 border border-yellow-700 inline-block"
                style={{ width: '16px', height: '16px' }}></span>
                    <span>Square: {squareCount}</span>
                </div>
                <div className="flex items-center gap-1">
          <span className="inline-block"
                style={{ width: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '16px solid #34d399' }}>
          </span>
                    <span>Triangle: {triangleCount}</span>
                </div>
            </div>
            <div>Total: {shapes.length}</div>
        </footer>
    )
}

export default StatusBar
