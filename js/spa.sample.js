/*
 * thirdpen spa.sample.js
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

spa.sample = (() => {
  'use strict';
  //-------BEGIN SCOPE VARIABLES----------------------------
  let
    configMap = {
      anchor: null,
    },
    stateMap  = {
      //ローカルキャッシュはここで宣言
      container: null,
      offset: 0,
      tags: 'all'
    },
    domMap = {};
  //定数はここで宣言
  
  //画面表示の件数
  const LIST_FETCH = 20;
  //公開モジュールを参照する場合はここで宣言
  const entry_model = spa.model.entry('sample');
  //----END SCOPE VARIABLES-------------------------------- 

  //------------------- BEGIN UTILITY METHODS ------------------
  const okikae = spa.util.okikae;
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  //DOMメソッドにはページ要素の作成と操作を行う関数を配置
  //可読性のためtarget elementは分散させずにここで宣言
  const setDomMap = () => {
    domMap = {
      sample: document.getElementById('sample-contents'),
      more: document.getElementById('sample-more')
    };
  };


  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------

  //リストの再描画
  const onChangeNewist = event => {
    const sample = event.detail;
    const html = sample.map(({key, title, excerpt, date, tags}) =>
        okikae(
          `<div class="sample-section mdl-card__supporting-text">
           <section>
             <h3><a href="%s">${title}</a></h3>
             <p>${excerpt}</p>
             <footer class="mdl-mini-footer">
               <span><a href="/sample/${tags}">${tags}</a> | ${date}</span>
             </footer>
           </section>
          </div>`,
          () => {
            let [a, b] = key.split('_');
            return `/blog/${a}/${b}`;
          })).join('');

    domMap.sample.innerHTML = html;
    const offset = stateMap.offset + entry_model.list().length;
    //console.info(offset);
    if (offset === stateMap.offset || offset % LIST_FETCH > 0) {
      domMap.more.innerText = 'No More';
    } else {
      domMap.more.href = okikae('/sample/%s/%s', stateMap.tags, offset);
      stateMap.offset = offset;
    }

  };

  
  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  const configModule = input_map => {
    spa.util.setConfigMap({
      input_map: input_map,
      config_map: configMap
    });
  };

  // Begin public method /initModule/
  const initModule = container => {
    container.innerHTML = spa.sample.template;
    stateMap.container = document.getElementById('sample-container');
    setDomMap();
    
    // subscribe to custom_event
    spa.gevent.subscribe( stateMap.container, 'change-sample', onChangeNewist);
    
    //ローカルイベントのバインド
    //stateMap.container.addEventListener('click', handleAnchorClick, false);

    //mdlイベントの再登録
    componentHandler.upgradeDom();

    //anchor.page = [sample, tags, offset]
    const anchor = configMap.anchor;
    let params = {
      fetch: LIST_FETCH,
      tags: 'all',
      offset: 0
    }; 
    let key = 'newist';
    if (anchor.cache) key = 'current';
    
    switch(anchor.page.length) {
      case 1:
        //新着の初期値設定
        stateMap.offset = 0;
        stateMap.tags = 'all';
        break;
      case 2:
        //新着タグの初期値設定
        stateMap.offset = 0;
        stateMap.tags = decodeURIComponent(anchor.page[1]);
        params.tags = stateMap.tags;
        break;
      case 3:
        params.tags = stateMap.tags;
        params.offset = anchor.page[2];
        break;
      default:
        console.info(anchor.page);
        return false;
    }
    //console.info(params);
    entry_model[key](params);

  };

  // return public methods
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
})();

spa.sample.template = (() => {
  return `
    <article id="sample-container">
      <div class="sample-content mdl-grid">
        <div class="mdl-card mdl-cell--12-col mdl-shadow--2dp">
          <div class="mdl-card__title">
             <h2>What did you have in mind ?</h2>
          </div>
          <div>
            <p class="sample-description">
              Elabo Blog Systemのデモページです。
            </p>
          </div>
          <div id="sample-contents"></div>
        </div>
        <nav class="sample-nav mdl-cell mdl-cell--12-col">
          <a href="/sample/all" id="sample-more" title="show more">
            More
            <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i class="material-icons" role="presentation">arrow_forward</i>
            </button>
          </a>
        </nav>
      </div>
    </article>`;
})();
