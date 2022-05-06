# Kanban Board with React and ASP.NET Core
[![Npm package version](https://badgen.net/badge/react/v17.0.2/green)](https://www.npmjs.com/package/react)
[![Npm package version](https://badgen.net/badge/react-bootstrap/v2.3.1)](https://www.npmjs.com/package/react-bootstrap)
[![Npm package version](https://badgen.net/badge/react-beautiful-dnd/v13.1.0/cyan)](https://www.npmjs.com/package/react-beautiful-dnd)
[![Npm package version](https://badgen.net/badge/@fortawesome%2Freact-fontawesome/v0.1.18/orange)](https://www.npmjs.com/package/@fortawesome/react-fontawesome)


## Teendőket kezelő webalkalmazás
A projekt célja, hogy egy működő Kanban Board-ot valósítson meg. Frontend és backendből tevődik össze.

A böngészőben jelenik meg a React alapon elkészült frontend. Felületén teendők kártyákat lehet hozzáadni, módosítani, mozgatni az oszlopok között, illetve törölni.

A frontend-en történő módosítás össze van kötve megfelelő API végpontokkal így az adatok egyből perzistens módon tárolódnak el. Az adatok tárolására egy SQL adatbázis gondoskodik.

## A tábla felépítése
<img src="https://user-images.githubusercontent.com/24989500/167016415-9ac3764a-0098-473a-a5db-9f709b3f5be7.png" width="280">

- **Oszlop**: A táblán négy oszlop található, amiben vannak a teendők
- **Teendő**: Egy teendőnek van egy prioritása, címe, feladat leírása, határideje
  - **Prioritás**: A teendő fontosságát jelöli, ami lehet ***CRITICAL-piros, HIGH-narancs, MEDIUM-kék, LOW-zöld***
  - **Cím**: Teendő rövid ismertetője
  - **Feladat leírás**: Teendő részletesen kifejtve
  - **Határidő**: Teendőnek beállított határidő

### Kezelőfelület 
- **Teendő hozzáadása** az adtott oszlop tetején levő ``➕`` gombbal lehetséges. Egy felugró ablakban lehet megadni az adatokat a beviteli mezőkbe. Nem lehet üresen hagyni a beviteli mezőket ellenkező esetben sikertelen lesz a teendő hozzáadása, amit az ablak egyből jelez.
  
  <img src="https://user-images.githubusercontent.com/24989500/167196633-0fb74bf9-203d-404b-82af-0ec6879ea80b.png" width="300">

- **Drag and Drop modul** szolgál a teendők mozgatására.
A teendők a prioritás által kerülnek sorrendbe. Amennyiben azonos a sorrend két prioritás között ott a felhasználó is tud sorrendet cserélni a teendő megragadásával és fel-/lemozgatásával.
Továbbá az oszlopokat is változtatni a teendők oldal írányú mozgatásával.

- **Szerkesztés** egyszerűsége. Lehetőség van egy teendő adatainak megváltoztatására egyszerű rákattintással, ami egy felugró ablak segítségével könnyedén szerkeszthetővé válik. A létező adatokat betölti a szerver az adatbázisból a beviteli mezőkbe.

- Bootstap
- Input/Output
- Szerkesztés

...

## Strukturális felépítése

### Frontend
Öt lényegi React komponensből áll össze.
- Board
- BoardNoteTable
- Note
- NoteModal
- NameModal

### Backend
ASP.NET Core keretrendszer SQL adatbázissal
- TodoItemsController
- TodoContext
- TodoItem
- Program

- SQL local database with ToDo table name
## Használata

A projekt könyvtárában az alábbi parancs kiadásával indítható

```
npm start
```

Az alkalmazás a [http://localhost:3000](http://localhost:3000) porton fog futni.
