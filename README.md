# Kanban Board with React and ASP.NET Core
[![Npm package version](https://badgen.net/badge/react/v17.0.2/green)](https://www.npmjs.com/package/react)
[![Npm package version](https://badgen.net/badge/react-bootstrap/v2.3.1)](https://www.npmjs.com/package/react-bootstrap)
[![Npm package version](https://badgen.net/badge/react-beautiful-dnd/v13.1.0/cyan)](https://www.npmjs.com/package/react-beautiful-dnd)
[![Npm package version](https://badgen.net/badge/@fortawesome%2Freact-fontawesome/v0.1.18/orange)](https://www.npmjs.com/package/@fortawesome/react-fontawesome)
[![Npm package version](https://badgen.net/badge/axios/v0.27.2/red)](https://www.npmjs.com/package/axios)


## Teendőket kezelő webalkalmazás
A projekt célja, hogy egy működő Kanban Board-ot valósítson meg. Frontend és backendből tevődik össze.

A böngészőben jelenik meg a React alapon elkészült frontend. Felületén teendők kártyákat lehet hozzáadni, módosítani, mozgatni az oszlopok között, illetve törölni azokat.

A frontend-en történő módosítás össze van kötve megfelelő API végpontokkal így az adatok egyből perzistens módon tárolódnak el. Az adatok tárolására egy SQL adatbázis gondoskodik.

## A tábla felépítése
<img src="https://user-images.githubusercontent.com/24989500/167016415-9ac3764a-0098-473a-a5db-9f709b3f5be7.png" width="280">

- **Oszlop**: A táblán négy oszlop található, ami a teendőket segíti csoportosítani oszlopokba
- **Teendő**: Egy teendőnek van egy prioritása, címe, feladat leírása, határideje
  - **Prioritás**: A teendő fontosságát jelöli, ami lehet ***CRITICAL-piros, HIGH-narancs, MEDIUM-kék, LOW-zöld***
  - **Cím**: Teendő rövid ismertetője
  - **Feladat leírás**: Teendő részletesen kifejtve
  - **Határidő**: Teendőnek beállított határidő

### Kezelőfelület 
- <ins>**Teendő hozzáadása**</ins> az adott oszlop tetején levő ``➕`` gombbal lehetséges. Egy felugró ablakban lehet megadni az adatokat a beviteli mezőkbe. Nem lehet üresen hagyni a beviteli mezőket ellenkező esetben sikertelen lesz a teendő hozzáadása, amit az ablak egyből jelez.
  
  <img src="https://user-images.githubusercontent.com/24989500/167196633-0fb74bf9-203d-404b-82af-0ec6879ea80b.png" width="300">

- <ins>**Drag and Drop modul**</ins> szolgál a teendők mozgatására.
A teendők a prioritás által kerülnek sorrendbe. Amennyiben azonos a sorrend két prioritás között ott a felhasználó is tud sorrendet cserélni a teendő megragadásával és fel-/lemozgatásával.
Továbbá az oszlopokat is változtatni a teendők oldal írányú mozgatásával.

- <ins>**Szerkesztés**</ins> egyszerűsége. Lehetőség van egy teendő adatainak megváltoztatására egyszerű rákattintással, ami egy felugró ablak segítségével könnyedén szerkeszthetővé válik. A létező adatokat betölti a szerver az adatbázisból a beviteli mezőkbe.

- <ins>**Beviteli mezők**</ins> amelyekből négy darab van és mindegyik különböző.
  - Címhez egy sima text típusú mező tartozik
  - Prioritáshoz egy legördülő menüből lehet választani (alapértelmezett a Critical)
  - Leíráshoz egy textarea típusú mező tartozik
  - Dátumhoz pedig egy date time típusú mező gondoskodik
 
- <ins>**Bootstap modul**</ins> felhasználásával lett elkészítve a weboldal a letisztult designért.

## Strukturális felépítése

### Frontend
Öt lényegi React komponensből áll össze
- <ins>**Board**</ins> a fő komponens. Inicializálja majd eltárolja az adatokat a state-ben. Legenerálja a négy *BoardNoteTable* oszlopot a megfelelő propertikkel
- <ins>**BoardNoteTable**</ins> megkapja az oszlopban szereplő teendőket és annak az adatait, majd amennyit tartalmaz annyi *Note* teendőt létrehoz
- <ins>**Note**</ins> egy teendőt reprezentál az oldalon. 
- <ins>**NoteModal**</ins> felugró ablak szolgál egy *Note* lérehozására, szerksztésére
- <ins>**NameModal**</ins> egy felugró ablak amennyiben szeretnénk átírni a oszlop címét

### Backend
ASP.NET Core keretrendszer SQL adatbázissal
- <ins>**TodoItemsController**</ins> fogadja az API hívásokat, majd végrehajtódik ennek megfelelő a függvény
- <ins>**TodoContext**</ins> 
- <ins>**TodoItem**</ins> az adatosztályt reprezentálja
- <ins>**Program**</ins> inicializálja valamint beállítja az adatbázist
- <ins>**SQL**</ins> tárol egy TodoContext adatbázist egy Todo táblával benne a megfelelő TodoItem-ekkel.

### APIs
| METHOD | DESCRIPTIONS | URL
| --- | --- | --- |
| POST | Új teendő hozzadása | `api/todoitems`
| GET | Összes teendő lekérdezése | `api/todoitems`
| GET | ID alapján teendő lekérdezés | `api/todoitems/{id}`
| PUT | ID alapján teendő frissítés | `api/todoitems/{id}`
| PUT | ID alapján teendő oszlop frissítés | `api/todoitems/column/{id}`
| DELETE | ID alapján teendő törlése | `api/todoitems/{id}`

## Használata

**Frontend**

A projekt könyvtárában egy terminál ablakban az alábbi parancs kiadásával indítható program
```
npm start
```
Az alkalmazás a [https://localhost:3000](https://localhost:3000) porton fut.

**Backend**

`react-backend.exe`-vel futtatható az adatbázis 
> (ToDoReactWithBackend\react-backend\bin\Debug\net6.0\react-backend.exe)
