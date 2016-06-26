#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

APP_ROOT_DIR = os.path.abspath(os.path.dirname(__file__))

SETTINGS = {
    'title': 'ThirdPen',
    'description': "Google App Engine-Based Plathome",
    'author': 'ryuji.oike@gmail.com',
    'email': 'ryuji.oike@gmail.com ',
    'url': 'https://third-pen.com',
    'mail_to': '',
    'items_per_page': 10,
    # Google Cloud Strage 設定
    # Enable/disable Google Analytics
    # Set to your tracking code (UA-xxxxxx-x), or False to disable
    'google_analytics': False,
    # Enable/disable Disqus-based commenting for posts
}
