## Hinweise

### Release

Zwingend sollte ein Export-/Import-Mechanismus implementiert sein.

Mit der Ablösung der Tipprunde-Projekte (`tipprunde-www`, `tipprunde-backend`, `tipprunde-types` und
`tipprunde-hinterhof`) kann der komplette `seed`-Ordner plus das seed Script in der
`package.json` gelöscht werden.

Auch die Dependencies `drizzle-kit`, `tsx` und `ky` (die alle keine Prod-Dependencies sind), sollten
dann neu eingeordnet werden. Definitiv können `tsx` und `ky` dann auch entfernt werden.

Desweiteren gibt es im ORM-Schema einige `firebaseId`-Spalten, die dann auch gelöscht werden können.
