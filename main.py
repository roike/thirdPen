# -*- coding: utf-8 -*-
# thirdpen main
# See License
# -----------------------------------------------------

from bottle import Bottle, debug, request, response, static_file, abort
import logging
from json import loads
#localモジュール---------------------------------

bottle = Bottle()
debug(True)

#公開するanchorを設定する
ALLOW_ANCHOR = ['home', 'newist', 'blog', 'contact']

#---static_file section--------------------------------
#urlを直接入力する場合(bookmarkも同じ)もここに入る
#anchorがなければtemplateでページ不在を知らせる<--未実装
@bottle.route('/')
@bottle.route('/<anchor>')
@bottle.route('/<anchor>/<:re:.*>')
def init_anchor(anchor='home'):
    if anchor in ALLOW_ANCHOR:
        return static_file('pen.html', root='./static')

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
                #'appid': app_identity.get_application_id(),
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
    

#---start utility section------------------------------



