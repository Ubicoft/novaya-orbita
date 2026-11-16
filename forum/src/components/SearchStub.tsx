import { useLocale } from "../i18n/LocaleProvider";

export function SearchStub() {
  const { t } = useLocale();

  return (
    <div className="forum-search">
      <label className="text-caption" htmlFor="forum-search-input">
        {t.search.label}
      </label>
      <div className="forum-search__row">
        <input
          id="forum-search-input"
          type="search"
          placeholder={t.search.placeholder}
          disabled
          aria-disabled="true"
        />
        <button type="button" disabled aria-disabled="true">
          {t.search.label}
        </button>
      </div>
      <p className="forum-search__hint">{t.search.disabledHint}</p>
    </div>
  );
}
