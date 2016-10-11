/*
 * third-pen spa.home.js
 * Copyright 2016 ryuji.oike@gmail.com
 *-----------------------------------------------------------------
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global spa */
spa.home = (() => {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  let
    configMap = {
      anchor: null,
    },
    stateMap  = {
      //ローカルキャッシュはここで宣言
      container: null,
      offset: 0,
      tags: 'thirdpen'
    },
    domMap = {};
  //定数はここで宣言

  //画面表示の件数
  const LIST_FETCH = 31;
  //公開モジュールを参照する場合はここで宣言
  const entry_model = spa.model.entry();
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
 
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  //DOMメソッドにはページ要素の作成と操作を行う関数を配置
  const setDomMap = function () {
    domMap = {
      home: document.getElementById('home-contents'),
    };
  };
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  
  //リストの再描画
  //[{title:,slug:,content},..]
  const onChangeHome = event => {
    const home = event.detail;
    const rlist = _.range(home.length);
    rlist.unshift(_.findIndex(home, {slug: 'aboutme'}));
    const html = _.uniq(rlist).map(index => {
      const {title, content} = home[index];
      return `
        <div class="home-section mdl-card__supporting-text">
          <section>
            <h3>${title}</h3>
            <p>${content}</p>
          </section>
        </div>`;i
    }).join('');

    domMap.home.innerHTML = html;

  };

  //-------------------- END EVENT HANDLERS --------------------
  //------------------- BEGIN PUBLIC METHODS -------------------
  const configModule = input_map => {
    spa.util.setConfigMap({
      input_map: input_map,
      config_map   : configMap
    });
    return true;
  };

  // Begin public method /initModule/
  const initModule = container => {
    container.innerHTML = spa.home.template;
    stateMap.container = document.getElementById('home-container');
    setDomMap();
    
    // subscribe to custom_event
    spa.gevent.subscribe( 'spa', 'change-home', onChangeHome);
    
    //mdlイベントの再登録
    componentHandler.upgradeDom();

    const anchor = configMap.anchor;
    const params = {
      fetch: LIST_FETCH,
      tags: stateMap.tags,
      channel: 'home',
      offset: stateMap.offset
    };

    //channel=home,tag=thirdpen<----コンテンツを特定する
    entry_model.newist(params);
  };


  // return public methods
  return {
    configModule: configModule,
    initModule: initModule,
  };
  //------------------- END PUBLIC METHODS ---------------------
})();

spa.home.template = (() => {
  //
  return `
    <article id="home-container">
      <div class="home-content mdl-grid">
        <div class="mdl-card mdl-cell--12-col mdl-shadow--2dp">
          <div class="mdl-card__title">
             <h2>About Third Pen</h2>
          </div>
          <div id="home-contents"></div>
        </div>
      </div>
    </article>`;
})();
