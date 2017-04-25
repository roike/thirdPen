# -*- coding: utf-8 -*-
# thirdpen main
# See License
# -----------------------------------------------------

from bottle import Bottle, debug, request, response, static_file, abort
import logging
from json import loads
#localモジュール---------------------------------

app = Bottle()
debug(True)

#公開するanchorを設定する
ALLOW_ANCHOR = ['home', 'newist', 'blog', 'contact']

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
    #ワンタイム有効時間ありのアクセストークンをコンテンツ供給元から取得する
    pass



#---start utility section------------------------------



