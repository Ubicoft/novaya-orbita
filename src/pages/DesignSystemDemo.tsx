import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardEyebrow,
  CardFooter,
  CardTitle,
  Container,
  Divider,
  ImageBlock,
  Input,
  Link,
  LoadingState,
  Logo,
  Select,
  Spinner,
  Toggle,
} from "../components";
import { BrandLogo } from "../components/BrandLogo/BrandLogo";

const NAVY = [
  ["50", "#e8eef7", "var(--color-navy-50)"],
  ["100", "#c5d3ea", "var(--color-navy-100)"],
  ["200", "#9bb3d6", "var(--color-navy-200)"],
  ["300", "#6e90bf", "var(--color-navy-300)"],
  ["400", "#456fa8", "var(--color-navy-400)"],
  ["500", "#2a528c", "var(--color-navy-500)"],
  ["600", "#1e3f72", "var(--color-navy-600)"],
  ["700", "#152f57", "var(--color-navy-700)"],
  ["800", "#0f2140", "var(--color-navy-800)"],
  ["900", "#0a1628", "var(--color-navy-900)"],
  ["950", "#060e1a", "var(--color-navy-950)"],
] as const;

const BLUE = [
  ["50", "#eff6ff"],
  ["100", "#dbeafe"],
  ["200", "#bfdbfe"],
  ["300", "#93c5fd"],
  ["400", "#60a5fa"],
  ["500", "#3b82f6"],
  ["600", "#2563eb"],
  ["700", "#1d4ed8"],
  ["800", "#1e40af"],
  ["900", "#1e3a8a"],
  ["950", "#172554"],
] as const;

const CYAN = [
  ["50", "#ecfeff"],
  ["100", "#cffafe"],
  ["200", "#a5f3fc"],
  ["300", "#67e8f9"],
  ["400", "#22d3ee"],
  ["500", "#06b6d4"],
  ["600", "#0891b2"],
  ["700", "#0e7490"],
  ["800", "#155e75"],
  ["900", "#164e63"],
  ["950", "#083344"],
] as const;

const NEUTRALS = [
  ["0", "#ffffff"],
  ["50", "#f8fafc"],
  ["100", "#f1f5f9"],
  ["200", "#e2e8f0"],
  ["300", "#cbd5e1"],
  ["400", "#94a3b8"],
  ["500", "#64748b"],
  ["600", "#475569"],
  ["700", "#334155"],
  ["800", "#1e293b"],
  ["900", "#0f172a"],
] as const;

function SwatchGrid({
  prefix,
  shades,
}: {
  prefix: string;
  shades: readonly (readonly [string, string] | readonly [string, string, string])[];
}) {
  return (
    <div className="ds-swatch-grid">
      {shades.map(([step, hex]) => (
        <div className="ds-swatch" key={`${prefix}-${step}`}>
          <div
            className="ds-swatch__chip"
            style={{ background: hex }}
            title={`${prefix}-${step}`}
          />
          <div className="ds-swatch__meta">
            <div className="ds-swatch__name">
              {prefix}-{step}
            </div>
            <div className="ds-swatch__value">{hex}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DesignSystemDemo() {
  return (
    <div className="ds-page">
      <header className="ds-hero">
        <div className="ds-hero__orbit" aria-hidden="true">
          <span className="ds-hero__orbit-ring" />
          <span className="ds-hero__orbit-ring ds-hero__orbit-ring--2" />
          <span className="ds-hero__orbit-ring ds-hero__orbit-ring--3" />
          <span className="ds-hero__orbit-dot" />
        </div>
        <Container className="ds-hero__inner">
          <div className="ds-hero__brand">
            <Logo size="header" theme="light" />
          </div>
          <p className="text-caption ds-section__eyebrow">Stage 1 · Design System</p>
          <h1 className="text-display ds-hero__title">Дизайн-система Новой Орбиты</h1>
          <p className="text-body-lg ds-hero__lead">
            Фундамент визуального языка межуниверситетского объединения студенческих
            инициатив. Современность, доверие, интеллект и сотрудничество — без шаблонности
            и «конструкторного» вида.
          </p>
          <div className="ds-hero__meta">
            <Badge tone="accent" dot>
              Vite + React + TS
            </Badge>
            <Badge tone="info">RU · TJ · EN</Badge>
            <Badge tone="neutral">Токены CSS</Badge>
          </div>
        </Container>
      </header>

      <Container>
        <nav className="ds-demo-nav" aria-label="Разделы демо">
          <a href="#colors">Цвета</a>
          <a href="#typography">Типографика</a>
          <a href="#logo">Логотип</a>
          <a href="#buttons">Кнопки</a>
          <a href="#forms">Формы</a>
          <a href="#components">Компоненты</a>
          <a href="#motion">Motion</a>
          <a href="#adaptive">Адаптив</a>
        </nav>

        {/* ─── Colors ─── */}
        <section className="ds-section" id="colors">
          <div className="ds-section__header">
            <p className="text-caption ds-section__eyebrow">01 · Color</p>
            <h2 className="text-h2">Цветовые токены</h2>
            <p className="text-body text-muted" style={{ marginTop: "0.75rem" }}>
              Полные шкалы navy / blue / cyan / neutrals и семантические роли для кнопок,
              поверхностей, границ и состояний.
            </p>
          </div>

          <div className="ds-stack" style={{ gap: "var(--space-8)" }}>
            <div>
              <h3 className="text-h4" style={{ marginBottom: "var(--space-4)" }}>
                Navy — бренд / авторитет
              </h3>
              <SwatchGrid prefix="navy" shades={NAVY} />
            </div>
            <div>
              <h3 className="text-h4" style={{ marginBottom: "var(--space-4)" }}>
                Blue — действие / доверие
              </h3>
              <SwatchGrid prefix="blue" shades={BLUE} />
            </div>
            <div>
              <h3 className="text-h4" style={{ marginBottom: "var(--space-4)" }}>
                Cyan — акцент / орбита
              </h3>
              <SwatchGrid prefix="cyan" shades={CYAN} />
            </div>
            <div>
              <h3 className="text-h4" style={{ marginBottom: "var(--space-4)" }}>
                Neutrals — поверхности и текст
              </h3>
              <SwatchGrid prefix="neutral" shades={NEUTRALS} />
            </div>
          </div>

          <Divider label="Семантика" />

          <div className="ds-grid ds-grid--4">
            <div className="ds-swatch">
              <div className="ds-swatch__chip" style={{ background: "var(--color-btn-primary-bg)" }} />
              <div className="ds-swatch__meta">
                <div className="ds-swatch__name">Primary btn</div>
              </div>
            </div>
            <div className="ds-swatch">
              <div className="ds-swatch__chip" style={{ background: "var(--color-blue-600)" }} />
              <div className="ds-swatch__meta">
                <div className="ds-swatch__name">Secondary / link</div>
              </div>
            </div>
            <div className="ds-swatch">
              <div className="ds-swatch__chip" style={{ background: "var(--color-success-500)" }} />
              <div className="ds-swatch__meta">
                <div className="ds-swatch__name">Success</div>
              </div>
            </div>
            <div className="ds-swatch">
              <div className="ds-swatch__chip" style={{ background: "var(--color-error-500)" }} />
              <div className="ds-swatch__meta">
                <div className="ds-swatch__name">Error</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Typography ─── */}
        <section className="ds-section" id="typography">
          <div className="ds-section__header">
            <p className="text-caption ds-section__eyebrow">02 · Typography</p>
            <h2 className="text-h2">Типографика</h2>
            <p className="text-body text-muted" style={{ marginTop: "0.75rem" }}>
              Manrope (display) + Source Sans 3 (UI/body). Поддержка русского, таджикского
              (Ғ ғ Ӣ ӣ Қ қ Ӯ ӯ Ҳ ҳ Ҷ ҷ) и английского.
            </p>
          </div>

          <div className="ds-type-sample">
            <p className="text-caption text-tertiary">Display</p>
            <p className="text-display">Новая Орбита</p>
            <p className="ds-type-meta text-caption">
              Manrope 700 · clamp 2.5–3.75rem · tracking −0.02em
            </p>
          </div>
          <div className="ds-type-sample">
            <p className="text-caption text-tertiary">H1 / H2 / H3</p>
            <p className="text-h1">Межуниверситетское сотрудничество</p>
            <p className="text-h2" style={{ marginTop: "0.75rem" }}>
              Наука, проекты, лидерство
            </p>
            <p className="text-h3" style={{ marginTop: "0.5rem" }}>
              Международное развитие
            </p>
          </div>
          <div className="ds-type-sample">
            <p className="text-caption text-tertiary">Body · RU / TJ / EN</p>
            <p className="text-body-lg">
              Объединение создаёт пространство для инициатив студентов разных вузов.
            </p>
            <p className="text-body" style={{ marginTop: "0.75rem" }}>
              Мо ҳамчун донишҷӯён барои рушди илм, ҳамкорӣ ва пешрафт кор мекунем. Ҳарфҳои
              тоҷикӣ: Ғғ Ӣӣ Ққ Ӯӯ Ҳҳ Ҷҷ.
            </p>
            <p className="text-body" style={{ marginTop: "0.5rem" }}>
              Building a trusted platform for youth leadership across universities.
            </p>
          </div>
          <div className="ds-type-sample">
            <p className="text-caption text-tertiary">Nav · Button · Caption</p>
            <div className="ds-row" style={{ marginTop: "0.5rem" }}>
              <span className="text-nav">О нас</span>
              <span className="text-nav">Мероприятия</span>
              <span className="text-nav">Проекты</span>
              <span className="text-button">Вступить</span>
              <span className="text-caption">Stage 1</span>
            </div>
          </div>
        </section>

        {/* ─── Logo ─── */}
        <section className="ds-section" id="logo">
          <div className="ds-section__header">
            <p className="text-caption ds-section__eyebrow">03 · Logo</p>
            <h2 className="text-h2">Правила логотипа</h2>
            <p className="text-body text-muted" style={{ marginTop: "0.75rem" }}>
              Placeholder-знак: мягкая орбитальная геометрия + wordmark. Не искажать,
              не перекрашивать вне light/dark. Финальный ассет заменит mark без смены
              типографики названия.
            </p>
          </div>

          <div className="ds-logo-grid">
            <div className="ds-logo-cell ds-logo-cell--dark">
              <p className="text-caption ds-logo-cell__label">Official · header</p>
              <BrandLogo size="header" variant="horizontal" to={null} />
            </div>
            <div className="ds-logo-cell ds-logo-cell--dark">
              <p className="text-caption ds-logo-cell__label">Official · footer stacked</p>
              <BrandLogo size="footer" variant="stacked" to={null} />
            </div>
            <div className="ds-logo-cell ds-logo-cell--dark">
              <p className="text-caption ds-logo-cell__label">Official · mobile</p>
              <BrandLogo size="mobile" variant="horizontal" to={null} />
            </div>
            <div className="ds-logo-cell">
              <p className="text-caption ds-logo-cell__label">Placeholder wordmark · light</p>
              <Logo size="header" theme="light" />
            </div>
            <div className="ds-logo-cell ds-logo-cell--dark">
              <p className="text-caption ds-logo-cell__label">Placeholder · dark</p>
              <Logo size="header" theme="dark" />
            </div>
            <div className="ds-logo-cell ds-logo-cell--dark">
              <p className="text-caption ds-logo-cell__label">Placeholder mark only</p>
              <Logo size="header" theme="dark" markOnly />
            </div>
          </div>
        </section>

        {/* ─── Buttons & links ─── */}
        <section className="ds-section" id="buttons">
          <div className="ds-section__header">
            <p className="text-caption ds-section__eyebrow">04 · Actions</p>
            <h2 className="text-h2">Кнопки и ссылки</h2>
          </div>

          <div className="ds-stack" style={{ gap: "var(--space-6)" }}>
            <div>
              <p className="text-label" style={{ marginBottom: "var(--space-3)" }}>
                Primary / Secondary / Ghost
              </p>
              <div className="ds-row">
                <Button variant="primary">Вступить в объединение</Button>
                <Button variant="secondary">Узнать больше</Button>
                <Button variant="ghost">Подробнее</Button>
              </div>
            </div>
            <div>
              <p className="text-label" style={{ marginBottom: "var(--space-3)" }}>
                Размеры · состояния
              </p>
              <div className="ds-row">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button loading>Загрузка</Button>
                <Button disabled>Недоступно</Button>
              </div>
            </div>
            <div>
              <p className="text-label" style={{ marginBottom: "var(--space-3)" }}>
                Ссылки
              </p>
              <div className="ds-row">
                <Link href="#typography">О типографике</Link>
                <Link variant="subtle" href="#colors">
                  К цветам
                </Link>
                <Link variant="nav" href="#logo">
                  Логотип
                </Link>
                <Link href="#forms" disabled>
                  Disabled
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Forms ─── */}
        <section className="ds-section" id="forms">
          <div className="ds-section__header">
            <p className="text-caption ds-section__eyebrow">05 · Forms</p>
            <h2 className="text-h2">Поля ввода</h2>
          </div>

          <div className="ds-grid ds-grid--2">
            <Input
              id="name"
              label="Имя и фамилия"
              placeholder="Алишер Раҳимов"
              hint="Как в документах университета"
            />
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="student@example.com"
              success
              defaultValue="student@rtsu.tj"
            />
            <Input
              id="uni-error"
              label="Университет"
              error="Укажите вуз из списка партнёров"
              defaultValue=""
              placeholder="Выберите или введите"
            />
            <Select
              id="direction"
              label="Направление"
              placeholder="Выберите направление"
              options={[
                { value: "science", label: "Наука и образование" },
                { value: "intl", label: "Международное сотрудничество" },
                { value: "media", label: "Медиа и коммуникации" },
                { value: "events", label: "Организация мероприятий" },
              ]}
              hint="Можно изменить позже"
            />
            <Select
              id="lang"
              label="Язык интерфейса"
              disabled
              defaultValue="ru"
              options={[
                { value: "ru", label: "Русский" },
                { value: "tj", label: "Тоҷикӣ" },
                { value: "en", label: "English" },
              ]}
            />
            <div className="ds-stack">
              <Toggle
                id="newsletter"
                label="Получать новости"
                hint="Анонсы мероприятий и проектов"
                defaultChecked
              />
              <Toggle id="public" label="Публичный профиль" disabled />
            </div>
          </div>
        </section>

        {/* ─── Components ─── */}
        <section className="ds-section" id="components">
          <div className="ds-section__header">
            <p className="text-caption ds-section__eyebrow">06 · Components</p>
            <h2 className="text-h2">Базовые компоненты</h2>
          </div>

          <div className="ds-stack" style={{ gap: "var(--space-8)" }}>
            <div>
              <p className="text-label" style={{ marginBottom: "var(--space-3)" }}>
                Badges / статусы
              </p>
              <div className="ds-row">
                <Badge>Черновик</Badge>
                <Badge tone="info" dot>
                  Анонс
                </Badge>
                <Badge tone="success" dot>
                  Активно
                </Badge>
                <Badge tone="warning">Скоро</Badge>
                <Badge tone="error">Отменено</Badge>
                <Badge tone="accent">Партнёр</Badge>
              </div>
            </div>

            <div>
              <p className="text-label" style={{ marginBottom: "var(--space-3)" }}>
                Cards
              </p>
              <div className="ds-grid ds-grid--3">
                <Card>
                  <CardEyebrow>Направление</CardEyebrow>
                  <CardTitle>Наука и образование</CardTitle>
                  <CardBody>
                    Исследовательские инициативы, дебаты и академические проекты студентов.
                  </CardBody>
                </Card>
                <Card interactive>
                  <CardEyebrow>Интерактив</CardEyebrow>
                  <CardTitle>Международное сотрудничество</CardTitle>
                  <CardBody>
                    Карточка с hover/active. Нажмите — демонстрация состояния.
                  </CardBody>
                  <CardFooter>
                    <Badge tone="info">Hover me</Badge>
                  </CardFooter>
                </Card>
                <Card variant="elevated">
                  <CardEyebrow>Elevated</CardEyebrow>
                  <CardTitle>Проекты участников</CardTitle>
                  <CardBody>
                    Поверхность с тенью для ключевых блоков контента.
                  </CardBody>
                </Card>
              </div>
            </div>

            <div>
              <p className="text-label" style={{ marginBottom: "var(--space-3)" }}>
                Alerts · loading · image · divider
              </p>
              <div className="ds-stack">
                <Alert tone="success" title="Заявка отправлена">
                  Мы свяжемся с вами после проверки анкеты куратором направления.
                </Alert>
                <Alert tone="error" title="Не удалось сохранить">
                  Проверьте обязательные поля и попробуйте снова.
                </Alert>
                <Alert tone="warning" title="Черновик не опубликован">
                  Изменения видны только вам до модерации.
                </Alert>
                <Alert tone="info" title="Три языка">
                  Интерфейс будет доступен на русском, таджикском и английском.
                </Alert>
              </div>

              <div className="ds-grid ds-grid--2" style={{ marginTop: "var(--space-6)" }}>
                <Card variant="muted">
                  <LoadingState label="Загрузка мероприятий…" />
                  <div className="ds-row" style={{ justifyContent: "center" }}>
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                  </div>
                </Card>
                <ImageBlock
                  placeholderLabel="Блок изображения"
                  caption="Image block · 16:10 · orbital placeholder"
                />
              </div>

              <Divider label="Контейнеры и разделители" />
              <p className="text-body-sm text-muted">
                Container: narrow / default / wide · Divider: default, strong, labeled
              </p>
            </div>
          </div>
        </section>

        {/* ─── Motion ─── */}
        <section className="ds-section" id="motion">
          <div className="ds-section__header">
            <p className="text-caption ds-section__eyebrow">07 · Motion</p>
            <h2 className="text-h2">Движение</h2>
            <p className="text-body text-muted" style={{ marginTop: "0.75rem" }}>
              Короткие, сдержанные переходы. При{" "}
              <code style={{ fontFamily: "var(--font-mono)" }}>prefers-reduced-motion</code>{" "}
              длительности обнуляются.
            </p>
          </div>

          <div className="ds-motion-demo">
            <div className="ds-motion-card">
              <h3 className="text-h4">Hover lift</h3>
              <p className="text-body-sm text-muted" style={{ marginTop: "0.5rem" }}>
                translateY −3px · shadow-md · {`{duration-base}`}
              </p>
            </div>
            <div className="ds-dark-panel">
              <span
                className="orbital-accent"
                style={{ width: "8rem", height: "8rem", top: "-1rem", right: "-1rem" }}
                aria-hidden="true"
              />
              <h3 className="text-h4">Dark surface + orbit</h3>
              <p className="text-body-sm" style={{ marginTop: "0.5rem", opacity: 0.75 }}>
                Мягкая геометрия как брендовый акцент — не sci-fi.
              </p>
              <div className="ds-row" style={{ marginTop: "var(--space-4)" }}>
                <Button variant="primary">Primary on dark*</Button>
              </div>
              <p className="text-caption" style={{ marginTop: "var(--space-3)", opacity: 0.5 }}>
                *Primary остаётся navy; на тёмном фоне чаще secondary/ghost
              </p>
            </div>
          </div>
        </section>

        {/* ─── Adaptive ─── */}
        <section className="ds-section" id="adaptive">
          <div className="ds-section__header">
            <p className="text-caption ds-section__eyebrow">08 · Adaptive</p>
            <h2 className="text-h2">Адаптивные правила</h2>
            <p className="text-body text-muted" style={{ marginTop: "0.75rem" }}>
              Отдельные компоновки для телефона, планшета и десктопа — не сжатый десктоп.
            </p>
          </div>

          <div className="ds-bp-bar">
            <div className="ds-bp-item">
              <strong className="text-body">Phone · &lt; 640</strong>
              <span className="text-body-sm text-muted">
                1 колонка · logo без tagline · sticky nav wrap · увеличенные tap-зоны
              </span>
            </div>
            <div className="ds-bp-item">
              <strong className="text-body">Tablet · 640–1023</strong>
              <span className="text-body-sm text-muted">
                2 колонки · умеренные отступы · карточки парами
              </span>
            </div>
            <div className="ds-bp-item">
              <strong className="text-body">Desktop · ≥ 1024</strong>
              <span className="text-body-sm text-muted">
                3–4 колонки · полный wordmark · шире контейнер и секции
              </span>
            </div>
          </div>
        </section>

        <footer className="ds-footer-note">
          <Logo size="sm" theme="light" showTagline={false} href={undefined} />
          <p className="text-body-sm" style={{ marginTop: "var(--space-3)" }}>
            Stage 1 · только дизайн-система и превью. Маркетинговые страницы — Stage 2.
          </p>
        </footer>
      </Container>
    </div>
  );
}
