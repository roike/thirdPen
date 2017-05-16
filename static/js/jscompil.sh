#!/bin/bash
java -jar ~/GoogleDrive/closure-compiler/closure-compiler.jar --js='spa**.js' --js='!**fake.js' --js_output_file thirdpen.min.js
