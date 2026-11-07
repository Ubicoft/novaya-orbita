# Новая Орбита — официальный сайт

Межуниверситетское объединение студенческих инициатив.

## Этапы

| Stage | Статус | Содержание |
| --- | --- | --- |
| 1 | Готово | Дизайн-система + `/design-system` |
| 2 | Готово | Каркас (затем редизайн) |
| 2b | Готово | Редизайн: winter default, glass header, темы blue/pink/green/winter |
| 3+ | Не начат | Контентные страницы (главная и др.) |

**Тема по умолчанию:** winter (`localStorage: novaya-orbita.theme`). После НГ — сменить `DEFAULT_THEME` на `blue`.

## Стек

Vite 8 · React 19 · TypeScript · CSS tokens · react-router-dom

## Запуск

```bash
cd novaya-orbita
npm install
npm run dev
```

Превью: http://localhost:5173

| Путь | Что |
| --- | --- |
| `/` | Каркас + stub главной |
| `/about` … `/join` | Stub-разделы |
| `/design-system` | Витрина токенов/компонентов |

## Структура

```
src/
  styles/           # tokens + foundation
  components/       # UI kit Stage 1 + BrandLogo
  i18n/             # ru / tj / en
  layout/           # Header, Footer, PageShell
  pages/            # DesignSystemDemo, StubPage
  assets/brand/     # официальные PNG логотипы
```

Язык интерфейса сохраняется в `localStorage` (`novaya-orbita.locale`).
