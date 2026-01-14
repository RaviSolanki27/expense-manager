const IconButton = ({ label, frontIcon, backIcon }: { label: string, frontIcon?: React.ReactNode, backIcon?: React.ReactNode }) => {
    return (
        <button className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5 text-xs cursor-pointer hover:bg-purple-20 hover:text-purple-80 ">
            {frontIcon && (
                <span>
                    {frontIcon}
                </span>
            )}
            <span>{label}</span>
            {backIcon && (
                <span>
                    {backIcon}
                </span>
            )}
        </button>
    )
}

export default IconButton