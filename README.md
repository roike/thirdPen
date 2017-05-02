# Oto Blog System Subscriber
ブログの配信のみ行うサブシステムのテンプレートです。実際に自身のブログ<https://thirdpen.com>で使用しているものです。

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
但しcerbotの環境依存ドキュメントにある
<https://certbot.eff.org/#ubuntutyakkety-nginx>
を併用した。後者の設定のほうが簡単になっている。  

uWSGIのインストールの参考にしたのはFlaskのサンプルだが[How To Serve Flask Applications With uWSGI](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uwsgi-and-nginx-on-ubuntu-16-04)、Bottleも設定は同じである。

## Note
単体で動作を確認する場合は、spa.model.jsのモックステータスをtrueにしてください。spa.fake.jsに用意したデータの範囲で動作を確認できます。  
実際に動作させる場合は親システムであるOto Blog Systemをご自分のアカウントでデプロイする必要があります。  
またappidで親子関係の承認を行っていますが、子システムのappidは親システムの投稿グループに登録されている必要があります。third-penというappidが投稿グループに登録がある、ということになります。承認の仕組みは今後変更する予定です。

## History
### 動作環境をGoogle App EngineからCompute Engineに変更
thirdpen.comはもともとjsファイル等の静的ファイルを落とすだけでマシンパワーを必要としないので、マイクロインスタンスが無料で提供されることになったのを機会に、Https化でLet's Encriptの更新が簡単なCompute Engineに載せ替えることにしました
## Licensing
See [LICENSE](LICENSE)
