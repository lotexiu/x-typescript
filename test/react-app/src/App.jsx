import React, { useEffect } from "react";

import "@lotexiu/typescript/global";
import { synthwaveTheme } from "./theme";
import { ThemeUtils } from "@lotexiu/typescript/theme/utils";

export default function App() {
  // Aplica o tema uma única vez
  console.log(synthwaveTheme)
  ThemeUtils.applyThemeToDocument(synthwaveTheme);

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      {/* Sidebar */}
  <aside className="bg-sidebar bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border p-4 flex flex-col gap-4">
        <div className="text-xl font-semibold">Demo UI</div>

        <nav className="flex flex-col gap-1">
          <a
            className="px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            href="#cores"
          >
            Cores
          </a>
          <a
            className="px-3 py-2 rounded-md bg-sidebar-primary text-sidebar-primary-foreground ring-1 ring-inset ring-sidebar-ring"
            href="#superficies"
          >
            Superfícies
          </a>
          <a
            className="px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border border-sidebar-border"
            href="#inputs"
          >
            Inputs
          </a>
        </nav>

        <div className="mt-auto text-xs opacity-75">
          <div>bg: sidebar-background / sidebar</div>
          <div>text: sidebar-foreground</div>
          <div>accent: sidebar-accent / sidebar-accent-foreground</div>
          <div>primary: sidebar-primary / sidebar-primary-foreground</div>
          <div>ring: sidebar-ring</div>
          <div>border: sidebar-border</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="bg-background text-foreground p-6 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Paleta e Componentes</h1>
          <div className="inline-flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-primary text-primary-foreground">Primary</span>
            <span className="px-3 py-1 rounded-md bg-accent text-accent-foreground">Accent</span>
            <span className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground">Secondary</span>
          </div>
        </header>

        {/* Cores principais */}
        <section id="cores" className="space-y-4">
          <h2 className="text-lg font-semibold">Cores principais</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Cada bloco cita o nome da variável via classe Tailwind */}
            <Swatch name="background" className="bg-background" />
            <Swatch name="foreground" className="bg-foreground text-background" />
            <Swatch name="primary" className="bg-primary text-primary-foreground" />
            <Swatch name="accent" className="bg-accent text-accent-foreground" />
            <Swatch name="secondary" className="bg-secondary text-secondary-foreground" />
            <Swatch name="muted" className="bg-muted text-muted-foreground" />
            <Swatch name="destructive" className="bg-destructive text-destructive-foreground" />
            <Swatch name="card" className="bg-card text-card-foreground" />
            <Swatch name="popover" className="bg-popover text-popover-foreground" />

            {/* Suporte a possíveis alias que você listou */}
            <Swatch name="success" className="bg-success text-foreground" />
            <Swatch name="warning" className="bg-warning text-foreground" />
            <Swatch name="error" className="bg-error text-foreground" />
          </div>
        </section>

        {/* Superfícies, bordas, radius, ring */}
        <section id="superficies" className="space-y-4">
          <h2 className="text-lg font-semibold">Superfícies, bordas e efeitos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card text-card-foreground rounded-lg p-4 border border-border">
              <div className="font-medium">Card</div>
              <p className="text-sm opacity-80">bg-card, text-card-foreground, border-border</p>
            </div>

            <div className="bg-popover text-popover-foreground rounded-lg p-4 ring-2 ring-ring">
              <div className="font-medium">Popover</div>
              <p className="text-sm opacity-80">bg-popover, text-popover-foreground, ring-ring</p>
            </div>

            <div className="bg-background rounded-lg p-4 border border-input">
              <div className="font-medium">Input container</div>
              <p className="text-sm opacity-80">border-input</p>
              <input
                type="text"
                placeholder="Digite algo..."
                className="mt-2 w-full rounded-md bg-background border border-input px-3 py-2 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Radius showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted text-mutedForeground p-4 rounded-sm">rounded-sm (radius-sm)</div>
            <div className="bg-muted text-mutedForeground p-4 rounded-md">rounded-md (radius-md)</div>
            <div className="bg-muted text-mutedForeground p-4 rounded-lg">rounded-lg (radius-lg)</div>
            <div className="bg-muted text-mutedForeground p-4 rounded-xl">rounded-xl (radius-xl)</div>
          </div>
        </section>

        {/* Charts */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Charts</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Swatch name="chart-1" className="bg-chart-1 text-foreground" />
            <Swatch name="chart-2" className="bg-chart-2 text-foreground" />
            <Swatch name="chart-3" className="bg-chart-3 text-foreground" />
            <Swatch name="chart-4" className="bg-chart-4 text-foreground" />
            <Swatch name="chart-5" className="bg-chart-5 text-foreground" />
            <Swatch name="chart-6" className="bg-chart-6 text-foreground" />
          </div>
        </section>

        {/* Cards de exemplo usando várias combinações */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Cards de exemplo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className="bg-card text-card-foreground rounded-lg border border-border p-4">
              <h3 className="font-semibold">Título do Card</h3>
              <p className="text-sm opacity-80">Exemplo com bg-card e text-card-foreground.</p>
              <button className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                Ação Primária
              </button>
            </article>

            <article className="bg-popover text-popover-foreground rounded-lg ring-1 ring-ring p-4">
              <h3 className="font-semibold">Popover/Card</h3>
              <p className="text-sm opacity-80">Demonstração com ring-ring.</p>
              <button className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/90">
                Botão Accent
              </button>
            </article>

            <article className="bg-destructive text-destructive-foreground rounded-lg border border-border p-4">
              <h3 className="font-semibold">Atenção</h3>
              <p className="text-sm opacity-80">Exemplo com bg-destructive.</p>
              <div className="mt-3 inline-flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-warning text-foreground">warning</span>
                <span className="px-2 py-1 rounded bg-error text-foreground">error</span>
                <span className="px-2 py-1 rounded bg-success text-foreground">success</span>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

function Swatch({ name, className }) {
  return (
    <div className={`rounded-md h-16 border border-border ring-0 flex items-center justify-center text-sm font-medium ${className}`}>
      {name}
    </div>
  );
}
