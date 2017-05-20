#!/bin/bash
java -jar ~/GoogleDrive/closure-compiler/closure-compiler.jar \
    --js='lib/spa.js' \
    --js='showdownext.js' \
    --js='fake.js' \
    --js='model.js' \
    --js='shell.js' \
    --js='home.js' \
    --js='newist.js' \
    --js='blog.js' \
    --js='contact.js' \
    --language_out ECMASCRIPT5 --js_output_file thirdpen.min.js
