#!/bin/sh
#

set -e

if [ -f ~/hubot.env ]; then
	source ~/hubot.env
else
	source ./hubot.env
fi

npm install
export PATH="node_modules/.bin:node_modules/hubot/node_modules/.bin:$PATH"
export NODE_PATH="$NODE_PATH:libs:models"

exec node_modules/.bin/hubot --name $HUBOT_NAME --adapter slack
