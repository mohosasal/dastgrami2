const Header = () => (
    <header className="flex justify-between items-center bg-white shadow px-4 py-2">
        <div className="font-bold text-xl">Painting Title</div>
        <div>
            <button className="btn">Import</button>
            <button className="btn ml-2">Export</button>
        </div>
    </header>
)
export default Header
