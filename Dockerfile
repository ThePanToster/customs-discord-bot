FROM node:18

RUN git clone https://github.com/ThePanToster/customs-discord-bot.git

WORKDIR /customs-discord-bot

RUN npm install

CMD git fetch origin main;git reset --hard origin/main;git pull;npm run deploycommands;npm start