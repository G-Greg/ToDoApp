# Kanban Board with React and ASP.NET Core
[![Npm package version](https://badgen.net/badge/react/v17.0.2/green)](https://www.npmjs.com/package/react)
[![Npm package version](https://badgen.net/badge/react-bootstrap/v2.3.1)](https://www.npmjs.com/package/react-bootstrap)
[![Npm package version](https://badgen.net/badge/react-beautiful-dnd/v13.1.0/cyan)](https://www.npmjs.com/package/react-beautiful-dnd)
[![Npm package version](https://badgen.net/badge/@fortawesome%2Freact-fontawesome/v0.1.18/orange)](https://www.npmjs.com/package/@fortawesome/react-fontawesome)


## Teendőket kezelő webalkalmazás
A projekt célja, hogy egy működő Kanban Board-ot valósítson meg. Frontend és backendből tevődik össze.

A böngészőben jelenik meg a React alapon elkészült frontend. Felületén teendők kártyákat lehet hozzáadni, módosítani, mozgatni az oszlopok között, illetve törölni.

A frontend-en történő módosítás össze van kötve megfelelő API végpontokkal így az adatok egyből perzistens módon tárolódnak el. A tárolásra szolgál egy adatbázis SQL segítségével.

## A tábla felépítése
<img src="https://user-images.githubusercontent.com/24989500/167016415-9ac3764a-0098-473a-a5db-9f709b3f5be7.png" width="300">

- **Oszlop**: A táblán négy oszlop található, amiben vannak a teendők
- **Teendő**: Egy teendőnek van egy prioritása, címe, feladat leírása, határideje

A teendők a prioritás által kerülnek sorrendbe. Amennyiben azonos a sorrend két prioritás között ott akár a felhasználó is tud sorrendet cserélni a teendő megragadásával és átmozgatásával.
Átmozgatással lehet továbbá az oszlopokat is változtatni.
Lehetőség van egy teendő adatainak megváltoztatására egyszerű rákattintással.

## Kezelőfelület 
- Gombok
- Drag and Drop
- Bootstap
- Input/Output
- Szerkesztés

## Használata

In the project directory, you can run:

```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


