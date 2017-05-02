# -*- coding: utf-8 -*-
# thirdpen main
# See License
# -----------------------------------------------------
from oauth2client.client import GoogleCredentials
from bottle import Bottle, debug, request, static_file, abort
import logging
from json import loads
#localモジュール---------------------------------

app = Bottle()
debug(True)

#公開するanchorを設定する
ALLOW_ANCHOR = ['home', 'newist', 'blog', 'contact']
#projectID
PROJECTID = 'vpwboard'
#---static_file section--------------------------------
#urlを直接入力する場合(bookmarkも同じ)もここに入る
#anchorがなければtemplateでページ不在を知らせる<--未実装
@app.route('/')
@app.route('/<anchor>')
@app.route('/<anchor>/<:re:.*>')
def init_anchor(anchor='home'):
    if anchor in ALLOW_ANCHOR:
        return static_file('pen.html', root='./static')

    abort(404, 'Sorry, Nothing at this URL.')


#---dynamic module section---------------------
@app.route('/identify', method='post')
def identify_appid():
    #ワンタイム有効時間ありのアクセストークンを取得する
    try:
        credentials = GoogleCredentials.get_application_default()
        token = credentials.get_access_token()
        anchor = '/' + '/'.join(loads(request.forms.get('page')))
        return { 
                'appid': PROJECTID,
                'token': token,
                'anchor': anchor
                }
    except Exception as e:
        logging.error(e)
        abort(500)



#---start utility section------------------------------



