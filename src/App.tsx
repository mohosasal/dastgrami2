import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import StatusBar from './components/StatusBar'

function App() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <Canvas />
            </div>
            <StatusBar />
        </div>
    )
}

export default App
