import { Shape } from '../types'

interface Props {
    shapes: Shape[]
}

const StatusBar = ({ shapes }: Props) => (
    <footer className="bg-white shadow text-sm px-4 py-2 flex gap-8">
        Status Bar
    </footer>
)

export default StatusBar
