import { Contact, Settings } from "lucide-react";

const Header: React.FC = () => {
    return <div className="p-4 bg-sky-500 text-white flex items-center justify-between">
        <h1 className="text-lg font-semibold">Messages</h1>
        <div className="flex space-x-3">
            <button className="p-2 rounded-full hover:bg-sky-600">
                <Contact className="size-[16px]"/>
            </button>
            <button className="p-2 rounded-full hover:bg-sky-600">
                <Settings className="size-[16px]"/>
            </button>
        </div>
    </div>
}
export default Header;