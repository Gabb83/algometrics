type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  status: boolean;
  label: string;              
}

export default function Button({
  onClick, disabled, status, label
}: ButtonProps) {
  return (
    <button
      onClick={onClick}       
      disabled={disabled}
      className="w-full px-5 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 font-medium shadow-md shadow-indigo-600/10 cursor-pointer"
    >
      {status ? "Ordenando..." : label}
    </button>
  );
}