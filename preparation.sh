#!/bin/bash

CREDENTIALS_DIR=bot/credentials
PRIVATE_KEY=$CREDENTIALS_DIR/private.key
PUBLIC_KEY=$CREDENTIALS_DIR/public.pem

if [ ! -d "$CREDENTIALS_DIR" ]; then
  echo "### $CREDENTIALS_DIR folder not found, creating"
  mkdir -p $CREDENTIALS_DIR
else
  echo "### $CREDENTIALS_DIR is found, not creating"
fi

if [ ! -f "$PRIVATE_KEY" ]; then
  echo "### $PRIVATE_KEY not found, creating"
  openssl genrsa -out $PRIVATE_KEY 2048
  openssl rsa -in $PRIVATE_KEY -pubout -out $PUBLIC_KEY
else
  echo "### $PRIVATE_KEY is found, not creating"
fi

# echo "### DB Migration"
# cd bot/db
# echo "### Rollback First"
# ../node_modules/.bin/knex migrate:rollback --all --env development
# ../node_modules/.bin/knex migrate:rollback --all --env production
# echo "### Migrate"
# ../node_modules/.bin/knex migrate:latest --env development
# ../node_modules/.bin/knex migrate:latest --env production