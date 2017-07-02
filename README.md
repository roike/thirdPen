<<<<<<< HEAD
## Elabo Blog System Subscriber
ブログの配信のみ行うサブシステムのテンプレートです。実際に自身のブログ<https://thirdpen.com>で使用しているものです。
###Note
単体で動作を確認する場合は、spa.model.jsのモックステータスをtrueにしてください。spa.fake.jsに用意したデータの範囲で動作を確認できます。  
実際に動作させる場合は親システムであるElabo Blog Systemをご自分のアカウントでデプロイする必要があります。  
またappidで親子関係の承認を行っていますが、子システムのappidは親システムの投稿グループに登録されている必要があります。third-penというappidが投稿グループに登録がある、ということになります。承認の仕組みは今後変更する予定です。
=======
# Oto Blog System Client
自身のブログ<https://thirdpen.com>の公開専用に使用しています。ブログ自体の作成・編集と配信はOto Blog Systemで行っています。
>>>>>>> google

## 動作環境
Google Compute Engine  
google-api-python-client
Nginx  
Python3  
bottle.py

## Install
[Compute Engine](https://cloud.google.com/compute/docs/?hl=ja)  
[google-api-python-client](https://developers.google.com/api-client-library/python/start/installation)

## 参考サイト
[How to Install Nginx on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)  

[How to Secure Nginx with Let'Encrypt on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)  
但しcerbotの環境依存ドキュメントのほうが新しいので
<https://certbot.eff.org/#ubuntutyakkety-nginx>
を併用しています。  

uWSGIのインストールの参考にしたのはFlaskのサンプルですが[How To Serve Flask Applications With uWSGI](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-16-04)、Bottleも設定は同じです。

## Note
単体で動作を確認する場合は、spa.model.jsのモックステータスをtrueにして、  

```
python3 wsgi.py
```
でbottleを動作させてください。spa.fake.jsに用意したデータの範囲で動作を確認できます。  
実際に動作させる場合は、親システムであるOto Blog Systemのように、コンテンツを配信するエンドポイントをご自分でデプロイする必要があります。  

## History
### 動作環境をGoogle App EngineからCompute Engineに変更
thirdpen.comはもともとjsファイル等をstatic配信するだけなので、マイクロインスタンスが無料で提供されることになったのを機会に、Let's Encriptの更新が簡単なCompute Engineに載せ替えることにしました
## Licensing
See [LICENSE](LICENSE)
