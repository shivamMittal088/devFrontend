import React, { useEffect, useState } from "react";

// OfflinePage.jsx
// Drop-in React component to show an attractive offline page when the user is offline.
// - Uses Tailwind classes for styling
// - Shows the uploaded image (local path) as an illustration
// - Exposes a Retry button and listens to online/offline events
// - Export default so you can import it into your router as the offline route

// Image path taken from uploaded file. If you move this image into your public/ folder,
// change the path to '/6535d28e-95a7-48c7-8225-4efb18a56daf.png'
import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage({ onRetry }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const tryReconnect = async () => {
    // Give a tiny delay so the browser can update navigator.onLine if it changed
    setTimeout(() => {
      if (navigator.onLine) {
        setIsOnline(true);
        if (typeof onRetry === "function") onRetry();
      } else {
        // quick fetch ping to test connectivity (to avoid false negatives)
        fetch("/favicon.ico", { method: "HEAD", cache: "no-store" })
          .then(() => {
            setIsOnline(true);
            if (typeof onRetry === "function") onRetry();
          })
          .catch(() => {
            setIsOnline(false);
            setShowDetails(true);
          });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      <div className="max-w-3xl w-full rounded-2xl bg-white/5 backdrop-blur p-6 md:p-10 shadow-2xl border border-white/6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-40 h-40 md:w-48 md:h-48 flex items-center justify-center rounded-xl bg-white/10 shadow-lg">
              <WifiOff className="w-20 h-20 text-white/80" />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-extrabold mb-2">You're offline</h2>
            <p className="text-gray-300 mb-4">
              It looks like your device isn't connected to the internet. Don't worry — your work is safe.
              Try reconnecting or check your network settings.
            </p>

            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={tryReconnect}
                className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium shadow-md transition"
              >
                Retry Connection <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-transparent border border-white/10 text-sm rounded-lg hover:bg-white/5 transition"
              >
                Force Reload
              </button>
            </div>

            <div className="text-sm text-gray-400 mb-2">
              Current status: <span className="font-semibold">{isOnline ? "Online" : "Offline"}</span>
            </div>

            <button
              onClick={() => setShowDetails((s) => !s)}
              className="text-xs text-gray-400 hover:text-gray-200"
            >
              {showDetails ? "Hide details" : "Why can't I connect?"}
            </button>

            {showDetails && (
              <div className="mt-3 text-xs text-gray-300 bg-white/3 p-3 rounded-md">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Check Wi‑Fi or mobile data on your device.</li>
                  <li>Try reconnecting to a different network.</li>
                  <li>Disable VPNs or proxies that might block requests.</li>
                  <li>If the issue persists, contact your network administrator or ISP.</li>
                </ul>
              </div>
            )}

            <div className="mt-6 text-xs text-gray-500">
              Tip: For a better offline experience, consider adding a <code>service worker</code> to cache
              static assets and serve a local fallback page.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
