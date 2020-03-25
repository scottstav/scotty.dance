# SAM for scotty.dance

build:
```
cd src/
bundle install
bundle install --deployoment
cd ..
sam build --skip-pull-image
```
test:
*For some reason this is really really slow. Most of the time is spent mounting the Docker container. I have no idea why.*
```
sam local start-api --skip-pull-image
sam local invoke <Lambda> -e event.json
```
deploy:
```
sam deploy
```
[api endpoint](https://api.scotty.dance "api.scotty.dance")
