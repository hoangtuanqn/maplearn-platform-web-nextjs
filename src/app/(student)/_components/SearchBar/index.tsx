import { Search } from "lucide-react";

const DocumentSearchBar = () => {
    return (
        <label className="relative hidden w-72 items-center rounded-lg bg-gray-100 px-2 py-3 xl:flex">
            <input
                className="text-primary w-full bg-transparent outline-none placeholder:text-gray-400"
                placeholder="Tìm kiếm"
            />
            <button type="button" className="ml-2 cursor-pointer">
                <Search className="size-4.5 opacity-60" />
            </button>
        </label>
    );
};

export default DocumentSearchBar;
