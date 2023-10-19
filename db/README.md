## Hinweise

Mit dem finalen Release und der Ablösung der Tipprunde-Projekte (`tipprunde-www`, `tipprunde-backend`,
`tipprunde-types` und `tipprunde-hinterhof`) kann der komplette `db/seed`-Ordner gelöscht werden.

Auch die Dependencies `drizzle-kit`, `tsx` und `ky` (die alle keine Prod-Dependencies sind), sollten
dann neu eingeordnet werden. Definitiv können `tsx` und `ky` dann auch entfernt werden.
