# 🚀 commands executed to solve tasks

```bash
# node 24, of course:
nvm use 24
# create directories and files needed:
mkdir server && cd server && mkdir -p endpoints models middlewares config src && touch package.json .env.example README.md
# install required packages:
npm install express mongoose dotenv && npm install --save-dev nodemon

# create .env by
cp .env.example .env

# git initialisieren..
git init && touch .gitignore

# local pushen mit
# shortcut ghrc =
# ghrc() {
#  read -e -p "Repo Name: " msg
#  gh repo create "$msg" --private --source=. --push
#}



```
