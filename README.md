# Cosmos Atlas

Интерактивный атлас Солнечной системы на React 19 + TypeScript + Vite.

## Запуск

```bash
npm install
npm run dev      # режим разработки
npm run build    # проверка типов + production-сборка
```

## Возможности

- Анимированное звёздное небо (canvas, параллакс от мыши)
- Планеты на чистом CSS (без картинок), в т.ч. кольца Сатурна
- Каталог: поиск, фильтры, сортировка, избранное (zustand + localStorage)
- Страница планеты: анимированные шкалы, схема орбит (SVG), факты
- Таймлайн космических миссий с фильтром
- Сравнение двух планет
- Квиз с рекордом
- HashRouter — работает на GitHub Pages без настройки

## Структура

```
src/
  components/  Starfield, PlanetOrb, PlanetCard, OrbitDiagram, StatBar, Navbar
  pages/       Home, Planets, PlanetDetail, Missions, Compare, Quiz, Favorites
  data/        planets, missions, quiz
  store/       zustand
  hooks/       useCountUp
```
