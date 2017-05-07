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
@app.route('/test')
def hello():
    return static_file('test.html', root='static')

@app.route('/icon.png')
def favicon():
    return static_file('icon.png', root='static/images')

@app.route('/images/<imgname>')
def serve_img(imgname):
    return static_file(imgname, root='static/images')

@app.route('/css/<cssname>')
def serve_css(cssname):
    return static_file(cssname, root='static/css')

@app.route('/js/<jsname>')
def serve_js(jsname):
    return static_file(jsname, root='static/js')

@app.route('/js/lib/<libname>')
def serve_jslib(libname):
    return static_file(libname, root='static/js/lib')

#urlを直接入力する場合(bookmarkも同じ)もここに入る
#anchorがなければtemplateでページ不在を知らせる<--未実装
@app.route('/')
@app.route('/<anchor>')
@app.route('/<anchor>/<:re:.*>')
def init_anchor(anchor='home'):
    if anchor in ALLOW_ANCHOR:
        return static_file('pen.html', root='static')

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



