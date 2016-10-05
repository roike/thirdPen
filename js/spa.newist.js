/*
 * thirdpen spa.newist.js
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
spa.newist = (() => {
  'use strict';
  //-------BEGIN SCOPE VARIABLES----------------------------
  let
    configMap = {
      anchor: null,
    },
    stateMap  = {
      //ローカルキャッシュはここで宣言
      container: null,
    },
    domMap = {};
  //定数はここで宣言
  const entry_model = spa.model.entry();
  //画面表示の件数
  const LIST_FETCH = 6;
  //公開モジュールを参照する場合はここで宣言
  //----END SCOPE VARIABLES-------------------------------- 

  //------------------- BEGIN UTILITY METHODS ------------------
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  //DOMメソッドにはページ要素の作成と操作を行う関数を配置
  //可読性のためtarget elementは分散させずにここで宣言
  const setDomMap = () => {
    domMap = {};
  };


  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------

  //記事リストの表示
  const loadNewist = event => {
    const newist = event.detail;
    let [channel, tag, offset] = _.rest(configMap.anchor.page);
    const html = newist.map(({key, title, excerpt, date, initdate, channel, tags}) => {
      let href = `/blog/${key.split('_').join('/')}`;
      return `
          <div class="newist-section mdl-card__supporting-text">
           <section>
             <h3><a href="${href}">${title}</a></h3>
             <p>${excerpt}</p>
             <footer class="mdl-mini-footer">
               <span><a href="/newist/${channel}/${tags}">${tags}</a> | ${date}</span>
               <span>初稿${initdate}</span>
             </footer>
           </section>
          </div>`;
          }).join('');

    offset = offset||0;
    let message = 'show more';
    let more;
    const newoffset = offset + entry_model.list().length;
    if (newoffset == offset || newoffset % LIST_FETCH > 0) {
      message = 'No More';
      more = `/newist/${channel}/${tag||'all'}/${offset}`;
    } else {
      more = `/newist/${channel}/${tag||'all'}/${newoffset}`;
    }
    stateMap.container.innerHTML = spa.newist.template([more, message, html]);
    
    //ローカルイベントのバインド
    //stateMap.container.addEventListener('click', handleAnchorClick, false);

    //mdlイベントの再登録
    componentHandler.upgradeDom();
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
    //anchor.page = [newist, channel, tags, offset]
    const [channel, tag, offset] = _.rest(configMap.anchor.page);
    const params = {
      fetch: LIST_FETCH,
      tags: tag||'all',
      channel: channel,
      offset: offset||0
    };
    stateMap.container = container;
    // subscribe to custom_event
    spa.gevent.subscribe( stateMap.container, 'change-newist', loadNewist);
    //ローカルイベントのバインド

    //pagingnation ------------------- 
    let key = 'newist';
    if (configMap.anchor.cache) key = 'current';
    console.info(params);
    
    entry_model[key](params);

  };

  // return public methods
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
})();

spa.newist.template = ([more, message, html]) => {
  return `
    <article id="newist-container">
      <div class="newist-content mdl-grid">
        <div class="mdl-card mdl-cell--12-col mdl-shadow--2dp">
          <div class="mdl-card__title">
             <h2>新着エントリ</h2>
          </div>
          <div>${html}</div>
        </div>
        <nav class="newist-nav mdl-cell mdl-cell--12-col">
          <a href="${more}" title="${message}">
            More
            <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i class="material-icons" role="presentation">arrow_forward</i>
            </button>
          </a>
        </nav>
      </div>
    </article>`;
};
