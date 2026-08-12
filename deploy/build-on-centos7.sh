#!/bin/bash
# Сборка сайта на CentOS 7 через Docker (т.к. Node.js 20 нельзя
# установить напрямую на CentOS 7 из-за старой версии glibc).
#
# Использование (в корне проекта, после git clone):
#   chmod +x deploy/build-on-centos7.sh
#   ./deploy/build-on-centos7.sh
#
# Результат: папка dist/ с готовым сайтом, скопированная в SITE_DIR.

set -e

# Путь, куда веб-сервер (Apache/Nginx) смотрит как на корень сайта.
# Поменяйте на свой, например /var/www/www-root/data/www/ваш-домен.ру
SITE_DIR="/var/www/html"

echo "==> Проверяю Docker..."
if ! command -v docker &> /dev/null; then
  echo "Docker не найден. Устанавливаю..."
  yum install -y yum-utils
  yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
  yum install -y docker-ce docker-ce-cli containerd.io
  systemctl enable --now docker
fi

echo "==> Собираю сайт в Docker-контейнере (Node.js 20)..."
docker build -f deploy/Dockerfile.build -t site-builder .

echo "==> Извлекаю папку dist из контейнера..."
CONTAINER_ID=$(docker create site-builder)
rm -rf ./dist
docker cp "$CONTAINER_ID:/app/dist" ./dist
docker rm "$CONTAINER_ID" > /dev/null

echo "==> Копирую файлы на сайт: $SITE_DIR"
mkdir -p "$SITE_DIR/api"
cp -r dist/* "$SITE_DIR/"
cp deploy/.htaccess "$SITE_DIR/"
cp deploy/api/*.php "$SITE_DIR/api/"

echo "==> Готово! Не забудьте один раз настроить $SITE_DIR/api/config.php"
echo "    (данные MySQL и почта для заявок)."
