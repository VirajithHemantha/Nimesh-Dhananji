import React, { useState } from 'react';
import { Copy, Link, MessageSquare } from 'lucide-react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');

  const prefixes = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'];

  const handleGenerate = () => {
    if (!guestName.trim()) {
      alert("Please enter a guest name");
      return;
    }
    const fullName = `${prefix} ${guestName.trim()}`;
    const link = `${window.location.origin}/?to=${encodeURIComponent(fullName)}`;
    setGeneratedLink(link);

    const message = `Dear ${fullName} ❤️\n\nWith joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${link}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Nimesh & Dhananji`;
    
    setGeneratedMessage(message);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden smooth-mobile-scroll bg-[#fdfaf5] p-4 md:p-8 font-montserrat">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-theme-200 my-4 md:my-0">
        <h1 className="text-3xl font-cinzel text-theme-900 mb-8 text-center">Wedding Invitation Link Generator</h1>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <label className="block text-xs font-bold text-theme-700 uppercase tracking-wider mb-2">Prefix</label>
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full bg-stone-50 border border-theme-200 rounded-lg px-4 py-3 text-theme-900 focus:outline-none focus:ring-2 focus:ring-theme-400"
              >
                {prefixes.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full md:w-2/3">
              <label className="block text-xs font-bold text-theme-700 uppercase tracking-wider mb-2">Guest Name</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full bg-stone-50 border border-theme-200 rounded-lg px-4 py-3 text-theme-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-theme-400"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-theme-800 text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-theme-900 transition-colors shadow-md"
          >
            Generate Link
          </button>

          {generatedLink && (
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-4 bg-stone-50 rounded-lg border border-theme-100">
                <p className="text-sm font-medium text-theme-800 mb-2">Generated Link:</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={generatedLink} 
                    className="flex-1 bg-white border border-theme-200 rounded px-3 py-2 text-sm text-stone-600 focus:outline-none"
                  />
                  <button 
                    onClick={() => copyToClipboard(generatedLink)}
                    className="p-2 bg-theme-100 text-theme-800 rounded hover:bg-theme-200 transition-colors"
                    title="Copy Link Only"
                  >
                    <Link size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-lg border border-theme-100">
                <p className="text-sm font-medium text-theme-800 mb-2">Message Template:</p>
                <textarea 
                  readOnly 
                  value={generatedMessage}
                  rows={10}
                  className="w-full bg-white border border-theme-200 rounded px-3 py-2 text-sm text-stone-600 focus:outline-none resize-none mb-2"
                />
                <button 
                  onClick={() => copyToClipboard(generatedMessage)}
                  className="w-full flex items-center justify-center gap-2 bg-theme-100 text-theme-800 py-3 rounded hover:bg-theme-200 transition-colors font-medium"
                >
                  <Copy size={18} />
                  Copy Full Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
