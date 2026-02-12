import { FilePdf, DownloadSimple, ShareNetwork } from '@phosphor-icons/react'

export function QuotePdfView() {
  return (
    <div className="flex h-[600px] flex-col items-center justify-center rounded-2xl border border-border/50 bg-muted/30 text-muted-foreground">
      <FilePdf size={48} className="opacity-20" />
      <p className="mt-4 text-lg font-medium">PDF Preview</p>
      <p className="mt-1 text-sm">The PDF preview will appear here</p>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs hover:bg-muted transition-colors"
        >
          <DownloadSimple size={14} />
          Download
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs hover:bg-muted transition-colors"
        >
          <ShareNetwork size={14} />
          Share Link
        </button>
      </div>
    </div>
  )
}
