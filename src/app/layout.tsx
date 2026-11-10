import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Outland Ledger | Paladín Retribution 70",
  description: "Tracker personal de equipo, heroicas, raids, monturas y oro para WoW TBC en 3.3.5a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
