# Skripte

PDFs, die im Physio-Orakel unter „Skripte & Unterlagen" zum Download stehen.

Neues Skript in zwei Schritten:

1. PDF in diesen Ordner legen — Dateiname ohne Leerzeichen und Umlaute,
   z. B. `Physio1_Herz_Zusammenfassung.pdf`.
2. Eintrag in `index.json` ergänzen, Reihenfolge der Liste = Reihenfolge auf der Seite:

```json
[
  {
    "file": "Physio1_Herz_Zusammenfassung.pdf",
    "title": "Herz — Zusammenfassung Physio I",
    "desc": "Erregungsbildung, Herzzyklus, EKG. 14 Seiten.",
    "pages": 14,
    "size": 1830000,
    "date": "September 2026"
  }
]
```

`title` und `file` sind Pflicht, der Rest optional (`size` in Bytes — `ls -l` zeigt sie).
Dann committen und pushen; nach dem Deploy steht das Skript unter
`https://nephron.at/skripte/<Dateiname>`.

Die Dateien sind über ihre Adresse öffentlich erreichbar — die Seite im
Orakel verlangt eine Anmeldung, der Link selbst nicht.
