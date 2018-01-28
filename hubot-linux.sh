#!/bin/sh
#

set -e

if [ -f ~/hubot.env ]; then
	source ~/hubot.env
else
	source ./hubot.env
fi

npm install --no-bin-links
export PATH="$(pwd)/node_modules/bin:$(pwd)/node_modules/coffee-script/bin:$(pwd)/node_modules/hubot/node_modules/bin:$PATH"
export NODE_PATH="$NODE_PATH:libs:models"

./node_modules/hubot/bin/hubot --name $HUBOT_NAME --adapter slack
