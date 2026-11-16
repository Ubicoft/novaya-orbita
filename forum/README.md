# Форум «Новая Орбита»

Отдельный продукт сообщества внутри монорепо сайта (папка `forum/`).
Канонический sibling-репозиторий: [Ubicoft/novaya-orbita-forum](https://github.com/Ubicoft/novaya-orbita-forum) — агентный token пока без write; рабочая копия и Pages-превью идут из этого дерева.

## Этапы

| Этап | Статус |
|---|---|
| F1 UI shell | готово |
| G0c категории по глобальному ТЗ (+ дебаты) | готово |
| F2 auth/DB foundation | scaffold в `server/` |
| F3+ темы/посты | следующий после F2 |

## Dev

```bash
npm install
npm run dev          # UI :5174
cd server && npm install && npm run dev   # API :8787 (после F2)
```

## Pages preview

Сборка вместе с сайтом: из корня `npm run build:all` → `dist/forum/`.
URL: https://ubicoft.github.io/novaya-orbita/forum/

Visual DNA совпадает с официальным сайтом: tokens, темы, glass header, типографика, brand cursor.
