# Psychologický test pro uchazeče o Policii ČR

## Jak spustit

1. **Nakopírujte všechny soubory do složky `policie-psychotesty`** (přesně podle struktury).
2. V kořenové složce spusťte:
   ```
   npm install
   npm run dev
   ```
3. Otevřete adresu z terminálu (obvykle http://localhost:5173).

## Struktura

- `src/App.js` – hlavní logika a navigace aplikace
- `src/components/` – jednotlivé obrazovky a moduly
- `src/data/mockTestModules.js` – všechna demo testová data
- `src/context/UserContext.js` – sdílení stavu uživatele
- `src/styles/index.css` – základní a tailwind styly

## Poznámky

- Obsah PDF `souhlas.pdf` je pouze ilustrační.
- Pro případné nasazení nebo backend integraci je potřeba rozšířit kód.