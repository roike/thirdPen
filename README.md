##Elabo Blog System Subscriber
ブログの配信のみ行うサブシステムのテンプレートです。実際に自身のブログ<https://third-pen.com>で使用しているものです。
###Note
単体で動作を確認する場合は、spa.model.jsのモックステータスをtrueにしてください。spa.fake.jsに用意したデータの範囲で動作を確認できます。  
実際に動作させる場合は親システムであるElabo Blog Systemをご自分のアカウントでデプロイする必要があります。  
またappidで親子関係の承認を行っていますが、子システムのappidは親システムの投稿グループに登録されている必要があります。third-penというappidが投稿グループに登録がある、ということになります。承認の仕組みは今後変更する予定です。


## Licensing
See [LICENSE](LICENSE)