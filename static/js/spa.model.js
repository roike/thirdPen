/*
 * thirdpen spa.model.js
 * See License
 *-----------------------------------------------------------------
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global spa */

/*
 -----ajaxの引数---------------
 ajax.get(url, params, callback)
 ajax.post(url, params, callback)
 -----response-----------------
 data = JSON.parse(response) == {publish: <val>, appsid: <appsid>}
*/
spa.model = (() =>{
  'use strict';
  //データキャッシュ
  let stateMap = {
    apps: null,
    blog: {template: null},
    entry: {}
  };

  //モックステータス--true-->fakeデータ使用
  const isFakeData = false;

  //インスタンスオブジェクト------------------------
  //初期値-->name='appspot'-->appid未確認-->appid確認にリダイレクト
  const Apps = (() => {
    const ajax = isFakeData ? spa.fake.mockAjax : spa.data.getAjax;
    //stateMap.apps = {appid:,token:,anchor:}
    const identify = pageList => {
      //console.info(pageList);
      const params = {page: JSON.stringify(pageList)};
      ajax.post('/identify', params)
        .then(response => {
          stateMap.apps = response;
          spa.gevent.publish('spa-identify', stateMap.apps);
        })
        .catch(error => {
          spa.gevent.publish('spa-error', error);
        })
    };

    return {
      get: () => stateMap.apps,
      identify: identify
    };

  })();

  const Blog = (() => {
    const ajax = isFakeData ? spa.fake.mockAjax : spa.data.getAjax;
    const load = page => {
      //page = configMap.anchor.page
      const url = 'https://elabo-one.appspot.com/thirdpen/' + page.join('/');
      ajax.get(url, {}, stateMap.apps.token )
        .then(data => {
          spa.gevent.publish('load-blog', data.publish);
        })
        .catch(error => {
          console.info(error);
          //認証違反は再認証
          if(_.has(error, 'status') && error.status === '401') {
            initModule();
          } else if(_.has(error, 'status') && error.status === '403') {
            initModule();
          } else {
            spa.gevent.publish('spa-error', error);
          }
        });
    };

    const current = url => {
      spa.gevent.publish('load-blog', stateMap.blog.template);
    };

    return {
      load: load,
      current: current
    };

  })();

  const Entry = () => {
    const ajax = isFakeData ? spa.fake.mockAjax : spa.data.getAjax;
    const custom = {
      'tech': 'change-newist',
      'think': 'change-newist',
      'github': 'change-newist',
      'euler': 'change-newist',
      'home': 'change-home'
    };

    //blog新着リスト--6件単位で取り出す
    const newist = params => {
      const url = `https://elabo-one.appspot.com/thirdpen/${params.channel}/${params.tags}/${params.offset}`;
      ajax.get(url, {fetch: params.fetch}, stateMap.apps.token)
        .then(data => {
          stateMap.entry.list = data.publish;
          spa.gevent.publish(custom[params.channel], data.publish);
        })
        .catch(error => {
          console.info(error);
          //認証違反は再認証
          if(_.has(error, 'status') && error.status === '401') {
            initModule();
          } else if(_.has(error, 'status') && error.status === '403') {
            initModule();
          } else {
            spa.gevent.publish('spa-error', error);
          }
        });
    };

    const current = params => {
      spa.gevent.publish(custom[params.channel], stateMap.entry.list);
    };


    return {
      newist: newist,
      current: current,
      list: () => stateMap.entry.list
    };
  };

  const Contact =(() => {
    const ajax = isFakeData ? spa.fake.mockAjax : spa.data.getAjax;

    const sendMail = (url, params) => {
      ajax.post(url, params)
        .then(data => {
          spa.gevent.publish('change-contact', data.publish);
        })
        .catch(error => {
          spa.gevent.publish('spa-error', error);
        });
    };

    return {
      mail: sendMail
    };
  })();

  const initModule = () => {
    //userオブジェクト初期値生成-->初期値-->name='00'-->ログイン未確認
    stateMap.apps = { appid: 'appspot'};
  };

  return {
    initModule: initModule,
    apps: Apps,
    entry: Entry,
    blog: Blog,
    contact: Contact
  };
})();
