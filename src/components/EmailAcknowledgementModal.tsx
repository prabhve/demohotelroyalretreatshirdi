import React, { useState } from 'react';
import {
  Mail,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Printer,
  X,
  Send,
  Calendar,
  Sparkles,
  ShieldCheck,
  Eye,
  FileText
} from 'lucide-react';
import { EmailAcknowledgement } from '../types';

interface EmailAcknowledgementModalProps {
  acknowledgement: EmailAcknowledgement;
  onClose: () => void;
  customerName?: string;
  refId?: string;
}

export const EmailAcknowledgementModal: React.FC<EmailAcknowledgementModalProps> = ({
  acknowledgement,
  onClose,
  customerName = 'Guest',
  refId
}) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'rendered' | 'plain'>('rendered');

  const handleCopy = () => {
    navigator.clipboard.writeText(acknowledgement.fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenMailto = () => {
    const subject = encodeURIComponent(acknowledgement.subject);
    const body = encodeURIComponent(acknowledgement.fullMessage);
    const url = `mailto:${acknowledgement.recipientEmail}?subject=${subject}&body=${body}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${acknowledgement.subject}</title>
            <style>
              body { font-family: sans-serif; padding: 20px; color: #23150d; }
              @media print {
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            ${acknowledgement.htmlContent || `<pre>${acknowledgement.fullMessage}</pre>`}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-70 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#fcfbf7] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#b45309]/30 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-[#23150d] text-[#fcfbf7] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-[#b45309]/30 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#f59e0b] font-bold">
                  Email Acknowledgement
                </span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Delivered
                </span>
              </div>
              <h2 className="font-serif text-sm sm:text-base md:text-lg font-bold text-white mt-0.5 truncate">
                Dispatched to {acknowledgement.recipientEmail}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Metadata Header Bar */}
        <div className="bg-[#f6efe3] px-4 sm:px-6 py-3 border-b border-[#d6c2a8] text-xs space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="space-y-0.5 text-[11px] sm:text-xs min-w-0 flex-1">
              <div className="truncate">
                <span className="text-[#23150d]/60 font-semibold w-12 sm:w-14 inline-block">From:</span>
                <span className="font-medium text-[#23150d]">
                  Hotel Royal Retreat &lt;reservations@hotelroyalretreatshirdi.com&gt;
                </span>
              </div>
              <div className="truncate">
                <span className="text-[#23150d]/60 font-semibold w-12 sm:w-14 inline-block">To:</span>
                <span className="font-bold text-[#b45309]">{acknowledgement.recipientEmail}</span>
                <span className="text-[#23150d]/60 ml-1">({customerName})</span>
              </div>
              <div className="truncate">
                <span className="text-[#23150d]/60 font-semibold w-12 sm:w-14 inline-block">Subject:</span>
                <span className="font-semibold text-[#23150d]">{acknowledgement.subject}</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-end gap-1 text-right shrink-0">
              <span className="text-[10px] sm:text-[11px] text-[#23150d]/70 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#b45309]" />
                {new Date(acknowledgement.sentAt).toLocaleDateString()}
              </span>
              {refId && (
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#b45309] bg-[#b45309]/10 px-2 py-0.5 rounded border border-[#b45309]/20">
                  Ref: {refId}
                </span>
              )}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#b45309]/15">
            <div className="flex items-center gap-1 bg-white/70 p-1 rounded-xl border border-[#d6c2a8]">
              <button
                type="button"
                onClick={() => setViewMode('rendered')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'rendered'
                    ? 'bg-[#b45309] text-white shadow-sm'
                    : 'text-[#23150d]/70 hover:text-[#23150d]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Formatted</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('plain')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'plain'
                    ? 'bg-[#b45309] text-white shadow-sm'
                    : 'text-[#23150d]/70 hover:text-[#23150d]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Raw Text</span>
              </button>
            </div>

            <span className="text-[10px] sm:text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Sent to Inbox
            </span>
          </div>
        </div>

        {/* Email Body Preview */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#fdfaf5]">
          {viewMode === 'rendered' ? (
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#e7d8c5] shadow-sm max-w-2xl mx-auto overflow-hidden">
              {acknowledgement.htmlContent ? (
                <div
                  className="prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: acknowledgement.htmlContent }}
                />
              ) : (
                <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#23150d] leading-relaxed">
                  {acknowledgement.fullMessage}
                </pre>
              )}
            </div>
          ) : (
            <div className="bg-[#1a0f08] text-[#fcfbf7] p-5 rounded-2xl border border-[#b45309]/30 font-mono text-xs leading-relaxed overflow-x-auto">
              <pre className="whitespace-pre-wrap">{acknowledgement.fullMessage}</pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#23150d] px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#b45309]/30">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#f59e0b]" />
                  <span>Copy Content</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#f59e0b]" />
              <span className="hidden sm:inline">Print Voucher</span>
            </button>

            <button
              type="button"
              onClick={handleOpenMailto}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Open email in default mail client"
            >
              <ExternalLink className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Open in Mail App</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
