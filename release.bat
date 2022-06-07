SET message=%1

npm run build

git add .

git commit -m %message%

git push heroku main

