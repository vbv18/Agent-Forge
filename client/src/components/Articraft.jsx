import { Layers } from "lucide-react";

export default function Articraft() {
  return (
    <aside
      aria-label="Agent Artifacts Panel"
      className="hidden xl:flex h-full border-l border-white/[0.06] bg-[#0c0d12] flex-col overflow-hidden shrink-0 w-[240px] select-none"
    >
      <div className="h-14 px-4 flex items-center gap-2 border-b border-white/[0.06] shrink-0">
        <Layers size={15} className="text-indigo-400" />
        <span className="text-[13px] font-semibold text-slate-200">
          Artifacts
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-500 gap-2">
        <div className="w-9 h-9 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-slate-500">
          <Layers size={16} />
        </div>
        <p className="text-xs font-medium text-slate-400">No artifacts yet</p>
        <p className="text-[11px] leading-relaxed text-slate-600">
          Generated diagrams, code files, and presentations will appear here.
        </p>
      </div>
    </aside>
  );
}
