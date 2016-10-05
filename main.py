#!/usr/bin/env python
# -*- coding: utf-8 -*-
# thirdpen main
# Copyright 2016 ryuji.oike@gmail.com
# -----------------------------------------------------
# Elabo Blog Systemの公開専用アプリ,単独では動作しない

from google.appengine.api import app_identity, urlfetch, taskqueue
from bottle import Bottle, debug, request, response, static_file, abort
import logging
from json import loads
#localモジュール---------------------------------

bottle = Bottle()
debug(True)

#公開するanchorを設定する
ALLOW_ANCHOR = ['home', 'newist', 'blog', 'contact', 'sample']

#Lets Encrypt Handler--If necessary
#letsencryptのchallenge_keyとvalueを設定する
@bottle.route('/.well-known/acme-challenge/:challenge')
def lets_encrypt_handler(challenge):
    response.content_type = 'text/plain'
    responses = {
            'challenge-key': 'private-key'
            }
    #logging.info(challenge)
    return responses.get(challenge, '')


#---static_file section--------------------------------
#urlを直接入力する場合(bookmarkも同じ)もここに入る
#anchorがなければtemplateでページ不在を知らせる<--未実装
@bottle.route('/')
@bottle.route('/<anchor>')
@bottle.route('/<anchor>/<channel>')
@bottle.route('/<anchor>/<channel>/<tag>')
@bottle.route('/<anchor>/<channel>/<tag>/<slug>')
def init_anchor(anchor='home', channel=None, tag=None, slug=None):
    if anchor in ALLOW_ANCHOR:
        return static_file('pen.html', root='./')

    abort(404, 'Sorry, Nothing at this URL.')


#---dynamic module section---------------------
@bottle.route('/identify', method='post')
def identify_appid():
    #ワンタイム有効時間ありのアクセストークンをコンテンツ供給元から取得する
    try:
        res = urlfetch.fetch(
            'https://elabo-one.appspot.com/thirdpen/inbound',
            method=urlfetch.GET,
            headers={},
            follow_redirects=False
        )
        if res.status_code != 200:
            raise Exception(
                'Call failed. Status code {}. Body {}'.format(
                    res.status_code, res.content))

        anchor = '/' + '/'.join(loads(request.forms.get('page')))
        return { 
                'appid': app_identity.get_application_id(),
                'token': res.content,
                'anchor': anchor
                }
    except Exception as e:
        logging.error(e)
        abort(500)


@bottle.route('/contact', method='post')
def contact_mail():
    params={
        'name': request.forms.get('name'),
        'email': request.forms.get('email'),
        'note': request.forms.get('note')
    }
    logging.info(params)
    try:
        taskqueue.Task(
            url='/task/mail/contact', 
            params=params
        ).add('task')
        
        return {'publish': u'メールを送信しました。'}
    except Exception as e:
        logging.info(e)
        abort(500)

#---start utility section------------------------------



