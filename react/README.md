# AppWorld Fullstack

Egy teljes körű fullstack alkalmazás tanulási céllal, amely Laravel backend és React frontend technológiákat használ termékkezelési rendszer megvalósításához.

## Technológiák

### Backend (Laravel)

-   **Laravel 11** - PHP framework
-   **Laravel Sanctum** - API authentication
-   **MySQL** - Adatbázis
-   **RESTful API** - JSON API endpoints

### Frontend (React)

-   **React 18** - Modern JavaScript library
-   **Vite** - Gyors development build tool
-   **React Router** - Client-side routing
-   **Context API** - State management
-   **Tailwind CSS** - Utility-first CSS framework

## Funkciók

-   **Felhasználói rendszer**

-   Regisztráció és bejelentkezés
-   Token-alapú hitelesítés
-   Kijelentkezés

-   **Termékkezelés**

-   Termékek listázása
-   Termék létrehozása
-   Termék szerkesztése
-   Termék törlése
-   Termék részletes nézet

-   **Modern UI/UX**
-   Reszponzív design
-   Success/error üzenetek
-   Loading states
-   Confirm dialógusok

## Projekt struktúra

```
appworld-fullstack/
├── app/                    # Laravel backend
│   ├── Http/Controllers/   # API controllers
│   └── Models/            # Eloquent models
├── react/                 # React frontend
│   ├── src/
│   │   ├── components/    # Komponensek
│   │   ├── context/       # Context providers
│   │   ├── pages/         # Oldalak
│   │   └── layouts/       # Layoutok
├── routes/api.php         # API routes
└── database/migrations/   # Adatbázis migrációk
```

## Telepítés

### Előfeltételek

-   PHP 8.2+
-   Composer
-   Node.js 18+
-   MySQL

### Backend (Laravel)

```bash
# Függőségek telepítése
composer install

# Environment fájl
cp .env.example .env

# Alkalmazás kulcs generálása
php artisan key:generate

# Adatbázis migráció
php artisan migrate

# Fejlesztői szerver
php artisan serve
```

### Frontend (React)

```bash
# Frontend könyvtárba navigálás
cd react

# Függőségek telepítése
npm install

# Fejlesztői szerver
npm run dev
```

## API Endpoints

### Authentikáció

-   `POST /api/register` - Regisztráció
-   `POST /api/login` - Bejelentkezés
-   `POST /api/logout` - Kijelentkezés

### Termékek

-   `GET /api/products` - Termékek listája
-   `GET /api/product/{id}` - Termék részletei
-   `POST /api/products` - Termék létrehozása (védett)
-   `PATCH /api/products/{id}` - Termék frissítése (védett)
-   `DELETE /api/products/{id}` - Termék törlése (védett)

## Tanulási célok

Ez a projekt a következő konceptusokat gyakorolja:

-   Laravel API fejlesztés
-   React modern fejlesztés
-   Context API state management
-   Token-based authentication
-   RESTful API design
-   Full-stack alkalmazás architektúra

## Fejlesztő

**Tamás Dudás** - Tanulási projekt
