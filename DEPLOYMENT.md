# Инструкция по развертыванию сайта-резюме на Linux сервере

## Требования
- Linux сервер с root доступом
- Установленный nginx
- Домен `about-kostya.online` (указанный на IP вашего сервера)

---

## Шаг 1: Установка Node.js и npm

### Для Ubuntu/Debian:

```bash
# Обновляем список пакетов
sudo apt update

# Устанавливаем curl (если не установлен)
sudo apt install -y curl

# Добавляем официальный репозиторий NodeSource для Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Устанавливаем Node.js и npm
sudo apt install -y nodejs

# Проверяем версии
node --version
npm --version
```

### Для CentOS/RHEL:

```bash
# Обновляем систему
sudo yum update -y

# Устанавливаем curl
sudo yum install -y curl

# Добавляем репозиторий NodeSource
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

# Устанавливаем Node.js и npm
sudo yum install -y nodejs

# Проверяем версии
node --version
npm --version
```

---

## Шаг 2: Подготовка проекта

### Вариант A: Загрузка через Git (если проект в репозитории)

```bash
# Переходим в домашнюю директорию или создаем директорию для проектов
cd ~
mkdir -p projects
cd projects

# Клонируем репозиторий (замените URL на ваш)
git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ> portfolio-website
cd portfolio-website
```

### Вариант B: Загрузка через SCP/SFTP

```bash
# На вашем локальном компьютере (Windows/Mac/Linux)
# Используйте WinSCP, FileZilla или scp команду:

# Пример через scp (выполните на локальной машине):
scp -r /путь/к/проекту user@your-server-ip:/home/user/projects/portfolio-website

# Затем на сервере:
cd ~/projects/portfolio-website
```

### Вариант C: Создание архива и загрузка

```bash
# На локальной машине создайте архив проекта (исключая node_modules)
# Затем загрузите на сервер и распакуйте:

cd ~/projects
tar -xzf portfolio-website.tar.gz
cd portfolio-website
```

---

## Шаг 3: Установка зависимостей и сборка

```bash
# Убедитесь, что вы в директории проекта
cd ~/projects/portfolio-website

# Устанавливаем зависимости
npm install

# Собираем проект для продакшена
npm run build

# Проверяем, что папка dist создана
ls -la dist/
```

После сборки в папке `dist/` будут статические файлы для развертывания.

---

## Шаг 4: Настройка директории для сайта

```bash
# Создаем директорию для сайта
sudo mkdir -p /var/www/about-kostya.online

# Копируем собранные файлы
sudo cp -r dist/* /var/www/about-kostya.online/

# Устанавливаем правильные права доступа
sudo chown -R www-data:www-data /var/www/about-kostya.online
sudo chmod -R 755 /var/www/about-kostya.online
```

---

## Шаг 5: Настройка Nginx

### Создаем конфигурационный файл для сайта:

```bash
sudo nano /etc/nginx/sites-available/about-kostya.online
```

### Вставьте следующую конфигурацию:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name about-kostya.online www.about-kostya.online;

    root /var/www/about-kostya.online;
    index index.html;

    # Логи
    access_log /var/log/nginx/about-kostya.online.access.log;
    error_log /var/log/nginx/about-kostya.online.error.log;

    # Основная конфигурация для React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэширование статических ресурсов
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Безопасность: скрываем версию nginx
    server_tokens off;

    # Запрещаем доступ к скрытым файлам
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

Сохраните файл (Ctrl+O, Enter, Ctrl+X в nano).

### Активируем сайт:

```bash
# Создаем символическую ссылку
sudo ln -s /etc/nginx/sites-available/about-kostya.online /etc/nginx/sites-enabled/

# Проверяем конфигурацию nginx на ошибки
sudo nginx -t

# Если проверка прошла успешно, перезагружаем nginx
sudo systemctl reload nginx
```

---

## Шаг 6: Настройка SSL сертификата (HTTPS)

### Устанавливаем Certbot:

```bash
# Для Ubuntu/Debian
sudo apt install -y certbot python3-certbot-nginx

# Для CentOS/RHEL
sudo yum install -y certbot python3-certbot-nginx
```

### Получаем SSL сертификат:

```bash
sudo certbot --nginx -d about-kostya.online -d www.about-kostya.online
```

Certbot автоматически:
- Получит сертификат от Let's Encrypt
- Обновит конфигурацию nginx для HTTPS
- Настроит автоматическое обновление сертификата

### Проверяем автообновление:

```bash
# Проверяем, что автообновление настроено
sudo certbot renew --dry-run
```

---

## Шаг 7: Настройка файрвола (если используется)

```bash
# Для UFW (Ubuntu)
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable

# Для firewalld (CentOS/RHEL)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

---

## Шаг 8: Проверка работы сайта

1. Откройте браузер и перейдите на `http://about-kostya.online` или `https://about-kostya.online`
2. Проверьте, что все страницы работают (главная, проекты, о себе)
3. Проверьте, что изображения загружаются корректно

---

## Шаг 9: Автоматическое обновление сайта (опционально)

### Создаем скрипт для обновления:

```bash
nano ~/update-portfolio.sh
```

Вставьте:

```bash
#!/bin/bash
cd ~/projects/portfolio-website

# Обновляем код (если используете git)
# git pull origin main

# Устанавливаем зависимости (если изменились)
npm install

# Собираем проект
npm run build

# Копируем файлы
sudo cp -r dist/* /var/www/about-kostya.online/

# Устанавливаем права
sudo chown -R www-data:www-data /var/www/about-kostya.online

echo "Сайт обновлен!"
```

Делаем скрипт исполняемым:

```bash
chmod +x ~/update-portfolio.sh
```

Использование:

```bash
~/update-portfolio.sh
```

---

## Шаг 10: Настройка автоматической сборки при push в Git (опционально)

### Устанавливаем webhook или используем GitHub Actions

Можно настроить автоматическую сборку при каждом push в репозиторий через:
- GitHub Actions
- GitLab CI/CD
- Webhook на сервере

---

## Устранение проблем

### Сайт не открывается:

```bash
# Проверяем статус nginx
sudo systemctl status nginx

# Проверяем логи nginx
sudo tail -f /var/log/nginx/about-kostya.online.error.log

# Проверяем конфигурацию
sudo nginx -t
```

### Ошибка 404 на страницах (кроме главной):

Убедитесь, что в конфигурации nginx есть строка:
```nginx
try_files $uri $uri/ /index.html;
```

### Изображения не загружаются:

```bash
# Проверяем права доступа
sudo ls -la /var/www/about-kostya.online/public/

# Проверяем, что файлы скопированы
sudo ls -la /var/www/about-kostya.online/
```

### Проблемы с правами доступа:

```bash
sudo chown -R www-data:www-data /var/www/about-kostya.online
sudo chmod -R 755 /var/www/about-kostya.online
```

---

## Полезные команды

```bash
# Перезапуск nginx
sudo systemctl restart nginx

# Перезагрузка конфигурации nginx (без остановки)
sudo systemctl reload nginx

# Проверка конфигурации nginx
sudo nginx -t

# Просмотр логов в реальном времени
sudo tail -f /var/log/nginx/about-kostya.online.access.log
sudo tail -f /var/log/nginx/about-kostya.online.error.log

# Проверка портов
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443
```

---

## Резервное копирование

Рекомендуется настроить регулярное резервное копирование:

```bash
# Создаем скрипт бэкапа
nano ~/backup-portfolio.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/user/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Бэкап файлов сайта
tar -czf $BACKUP_DIR/portfolio_$DATE.tar.gz /var/www/about-kostya.online

# Удаляем бэкапы старше 30 дней
find $BACKUP_DIR -name "portfolio_*.tar.gz" -mtime +30 -delete

echo "Бэкап создан: portfolio_$DATE.tar.gz"
```

---

## Готово!

Ваш сайт должен быть доступен по адресу: **https://about-kostya.online**

Если возникнут проблемы, проверьте логи nginx и убедитесь, что все шаги выполнены корректно.
