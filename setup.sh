#!/bin/bash - 
set -o nounset                              # Treat unset variables as an error
heroku config:set S3_BUCKET_NAME=hoppy-development
foreman run rails runner "puts ENV['S3_BUCKET']"
