import { JSX } from "react";

type BlockProps = {
    value: string | null;
    onClick: () => void;
};

const Block = ({ value, onClick }: BlockProps): JSX.Element => {
    return (
        <div onClick={onClick} className="cursor-pointer text-2xl font-bold uppercase border border-gray-800 flex items-center justify-center">
            {value || '\u00A0'}
        </div>
    );
};

export default Block;