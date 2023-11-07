## Hinweise

### Guide

Es sollte in der App kein direkter Zugriff auf die `db.server.ts` erfolgen, sondern nur indirekt
über die `model`-Module.

### Release

Zwingend sollte ein Export-/Import-Mechanismus implementiert sein.

Mit der Ablösung der Tipprunde-Projekte (`tipprunde-www`, `tipprunde-backend`, `tipprunde-types` und
`tipprunde-hinterhof`) kann der komplette `orm/seed`-Ordner gelöscht werden.

Auch die Dependencies `drizzle-kit`, `tsx` und `ky` (die alle keine Prod-Dependencies sind), sollten
dann neu eingeordnet werden. Definitiv können `tsx` und `ky` dann auch entfernt werden.

Desweiteren gibt es im ORM-Schema einige `firebaseId`-Spalten, die dann auch gelöscht werden können.
