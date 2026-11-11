// Путь к файлу из public/ с учётом vite.base.
// В dev BASE_URL = "/", в собранном виде = "/Guide_S-P/".
// Без префикса ссылки вида "aboutCity/1.png" работают в dev,
// но после деплоя в подпапку дают 404.
export default function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
