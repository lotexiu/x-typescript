import React from "react";

import '@lotexiu/typescript/global';
import { synthwaveTheme } from "./theme";
import { ThemeUtils } from "@lotexiu/typescript/theme/utils";

export default function App() {
  ThemeUtils.applyThemeToDocument(synthwaveTheme)
  
  return (
    <div className="flex h-screen bg-foreground text-(--foreground)">
      {/* SIDEBAR */}
      <aside className="w-64 bg-(--Sidebar) border-r border-(--SidebarBorder) flex flex-col">
        <div className="p-4 text-2xl font-bold text-(--SidebarAccent)">
          Synthwave UI
        </div>
        <nav className="flex-1 flex flex-col gap-2 p-4">
          <button className="text-left px-3 py-2 rounded bg-(--SidebarPrimary) hover:bg-(--SidebarAccent) transition">
            Dashboard
          </button>
          <button className="text-left px-3 py-2 rounded hover:bg-(--SidebarPrimary) transition">
            Charts
          </button>
          <button className="text-left px-3 py-2 rounded hover:bg-(--SidebarPrimary) transition">
            Settings
          </button>
        </nav>
        <div className="p-4 text-sm text-(--muted)">
          v1.0.0 Retrowave
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="p-4 border-b border-(--border) flex justify-between items-center bg-(--card)">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button className="px-4 py-2 rounded bg-(--primary) text-(--background) hover:bg-(--accent) transition">
            + New Item
          </button>
        </header>

        {/* CONTENT */}
        <section className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto">
          {/* CARD EXAMPLES */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-(--card) border border-(--border) rounded-lg p-4 hover:ring-2 hover:ring-(--ring) transition"
            >
              <h2 className="text-lg font-bold mb-2 text-(--primary)">
                Card {i}
              </h2>
              <p className="text-(--muted)">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                ultricies.
              </p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 bg-(--accent) text-(--background) rounded hover:opacity-80 transition">
                  Action
                </button>
                <button className="flex-1 py-2 bg-(--destructive) text-white rounded hover:opacity-80 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer className="p-4 border-t border-(--border) text-center text-sm text-(--muted) bg-(--popover)">
          © 2025 Retrowave UI Theme
        </footer>
      </main>
    </div>
  );
}
