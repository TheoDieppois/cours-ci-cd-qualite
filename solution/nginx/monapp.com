server {
    listen 80;
    server_name monapp.com;

    root /var/www/front/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
