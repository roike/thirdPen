#!/bin/bash
# project: Third-pen
#dev_appserver.py --enable_sendmail=yes --datastore_path=/Users/ryuji/GoogleDrive/gaestorage/thirdpen app.yaml
dev_appserver.py --enable_sendmail=yes --port=8083 dispatch.yaml app.yaml task.yaml
#dev_appserver.py --enable_sendmail=yes --port=8083 app.yaml
