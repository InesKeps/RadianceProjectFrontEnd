import { FaSearch } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";

const Header = () =>{
    return (
        <header className="h-full w-full flex justify-between items-center py-5">
            <div className="flex justify-between px-4 py-2 rounded-full bg-white w-1/4">
                <input className="text-sm text-[#9c9c9c]/80" type="text" name="" id="" placeholder="Rechercher" />
                <button className="text-[#9c9c9c]/80"><FaSearch/></button>
            </div>
            <div className="flex items-center gap-3 pr-8 text-[#000000]/60">
                <div className="flex justify-center items-center rounded-full w-10 h-10 bg-white">
                    <FaUserLarge/>
                </div>
                <p>Dr Diane Kenne</p>
            </div>
        </header>
    )
}

export default Header;