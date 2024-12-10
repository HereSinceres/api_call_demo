
#! /bin/sh
# set -x
# 脚本出错时退出

set -e

echo "start generator open api"
# https://medium.com/@youry.stancatte/generating-typescript-interfaces-from-swagger-1910cc7a726a
npx openapi-typescript@5.4.1 http://localhost:8080/api-json --output $PWD/src/api/openapi.dto.ts
