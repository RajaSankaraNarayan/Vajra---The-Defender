import { FC, useState } from 'react';
import { CHROME_EXTENSION_FILES, ExtensionFile } from '../engine/extensionCode';
import { 
  Code2, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  FolderArchive, 
  ShieldCheck,
} from 'lucide-react';
import JSZip from 'jszip';

export const ExtensionSourceViewer: FC = () => {
  const [selectedFile, setSelectedFile] = useState<ExtensionFile>(CHROME_EXTENSION_FILES[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    try {
      const zip = new JSZip();
      
      // Add all extension files to zip
      CHROME_EXTENSION_FILES.forEach((file) => {
        zip.file(file.name, file.content);
      });

      // Generate a small transparent dummy icon for manifest
      const dummyIconBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAPUlEQVR42u3PMQEAAAgEID/697SGB6ZDAxU1d6yVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlX0DiqgAM8V2jZkAAAAASUVORK5CYII=';
      const iconsFolder = zip.folder('icons');
      if (iconsFolder) {
        iconsFolder.file('icon16.png', dummyIconBase64, { base64: true });
        iconsFolder.file('icon48.png', dummyIconBase64, { base64: true });
        iconsFolder.file('icon128.png', dummyIconBase64, { base64: true });
      }

      // Add README instructions
      zip.file('README.md', `# Vajra - The Defender: E-Commerce Checkout Guard (Chrome Extension)

## How to Install in Google Chrome:
1. Extract this ZIP folder to your computer.
2. Open Google Chrome and navigate to: \`chrome://extensions/\`
3. Enable **Developer mode** toggle in the top-right corner.
4. Click **Load unpacked** in the top-left corner.
5. Select this extracted folder.
6. Vajra - The Defender is now active and protecting your checkout sessions!
`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'vajra-defender-chrome-extension.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate extension zip:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-exo">
      
      {/* Top Banner with Deep Midnight Gold Lighting */}
      <div className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-b from-[#060E28]/90 via-[#04091A]/95 to-[#020510]/95 border border-[#A08348]/35 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-xl bg-[#0A183D] border border-[#A08348]/50 text-[#E5C989] shadow-[0_0_15px_rgba(160,131,72,0.25)] flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#E5C989]" />
              MANIFEST V3 EXTENSION
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white font-vajra">
            Vajra Chrome Extension Source & ZIP
          </h2>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            Inspect the standalone, zero-dependency Manifest V3 source code or download the unpacked ZIP archive to sideload into Google Chrome or Edge.
          </p>
        </div>

        <button
          id="btn-download-extension-zip"
          onClick={handleDownloadZip}
          disabled={isDownloading}
          className="bg-gradient-to-r from-[#A08348] via-[#E5C989] to-[#A08348] hover:from-[#E5C989] hover:to-[#A08348] text-[#04091A] font-black text-xs px-5 py-3 rounded-2xl shadow-[0_0_20px_rgba(160,131,72,0.4)] flex items-center gap-2 transition-all hover:scale-105 shrink-0 border border-[#A08348]/60 relative z-10 cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#04091A]" />
          <span>{isDownloading ? 'Packaging Archive...' : 'Download Extension (.ZIP)'}</span>
        </button>
      </div>

      {/* Main Code Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* File Directory Sidebar */}
        <div className="lg:col-span-4 rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 p-4 border border-[#A08348]/30 shadow-xl space-y-3">
          <div className="flex items-center gap-2 px-2 py-1 text-slate-200 text-xs font-mono font-bold uppercase">
            <FolderArchive className="w-4 h-4 text-[#E5C989]" />
            <span>Extension Bundle Manifest</span>
          </div>

          <div className="space-y-1">
            {CHROME_EXTENSION_FILES.map((file) => {
              const isSelected = file.name === selectedFile.name;
              return (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-center justify-between font-mono text-xs border cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A183D] text-white border-[#A08348]/70 shadow-[0_0_15px_rgba(160,131,72,0.3)]'
                      : 'bg-[#060E26]/70 text-slate-200 border-[#A08348]/15 hover:bg-[#0A183D]/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-4 h-4 ${isSelected ? 'text-[#E5C989]' : 'text-slate-300'}`} />
                    <span className="truncate font-bold">{file.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-300 uppercase">{file.language}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-black/80 rounded-2xl border border-[#A08348]/25 text-xs text-slate-200 space-y-1.5 font-sans">
            <div className="font-bold flex items-center gap-1 text-[#E5C989]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Manifest V3 Compliant</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              Uses declarative DOM listeners and zero remote script evaluations for strict Web Store safety guidelines.
            </p>
          </div>
        </div>

        {/* Code Content Viewer */}
        <div className="lg:col-span-8 rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 border border-[#A08348]/30 shadow-xl overflow-hidden">
          {/* File Header Toolbar */}
          <div className="bg-[#060E26] px-5 py-3 border-b border-[#A08348]/25 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#E5C989]" />
              <span className="text-xs font-mono font-bold text-white">
                {selectedFile.name}
              </span>
              <span className="text-[10px] font-mono text-[#E5C989] bg-[#0A183D] px-2 py-0.5 rounded-full border border-[#A08348]/40">
                {selectedFile.language.toUpperCase()}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#0A183D] hover:bg-[#0E2254] text-white border border-[#A08348]/40 hover:border-[#A08348] transition-all cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#E5C989]" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Body */}
          <div className="p-4 sm:p-5 bg-black/90 max-h-[600px] overflow-y-auto font-mono text-xs text-slate-100 leading-relaxed">
            <pre className="overflow-x-auto whitespace-pre">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
