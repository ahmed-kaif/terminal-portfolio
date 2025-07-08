export default function TerminalHeader() {
  return (
    <div className="bg-catppuccin-surface0 px-4 py-2 flex items-center justify-between border-b border-catppuccin-surface1">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-catppuccin-red"></div>
        <div className="w-3 h-3 rounded-full bg-catppuccin-yellow"></div>
        <div className="w-3 h-3 rounded-full bg-catppuccin-green"></div>
      </div>
      <div className="text-catppuccin-subtext1 text-sm">portfolio@terminal:~$</div>
      <div className="w-16"></div>
    </div>
  );
}
