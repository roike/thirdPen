/*
 * thirdpen spa.blog.js
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
spa.blog = (() => {
  'use strict';
  //-------BEGIN SCOPE VARIABLES----------------------------
  const
    configMap = {
      anchor: null,
      previous: null,
    },
    stateMap  = {
      //ローカルキャッシュはここで宣言
      container: null,
      selfChannel: null
    };
  let  domMap = {};
  //定数はここで宣言

  //公開モジュールを参照する場合はここで宣言
  const blog_model = spa.model.blog;
  //----END SCOPE VARIABLES------------------------------------- 

  //------------------- BEGIN UTILITY METHODS ------------------
  const converter = new showdown.Converter({extensions: ['mathExt']});
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  //DOMメソッドにはページ要素の作成と操作を行う関数を配置
  const setDomMap = () => {
    domMap = {
      back: document.getElementById('blog-back')
    };
  };


  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  const onBack = event => {
    event.stopPropagation();
    //templateはキャッシュから取り出す
    //記事のアドレスを個別にGetした場合はprevious=blogなので
    //newist/techに置き換える
    const previous = configMap.previous;
    if (previous) {
      if (previous[0] === 'blog') {
        spa.uriAnchor.setAnchor({page: ['newist', stateMap.selfChannel], cache: false }, false);
      } else {
        spa.uriAnchor.setAnchor({page: previous, cache: true }, false);
      }
    }
  };
  
  const onLoad = event => {
    const embed = event.detail;
    stateMap.selfChannel = embed.channel;
    embed.content = converter.makeHtml(embed.content);
    stateMap.container.innerHTML = spa.blog.template(embed);
    spa.mathjax.update();
    setDomMap();
    
    //ローカルイベントのバインド
    domMap.back.addEventListener('click', onBack);

    //mdlイベントの登録
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
    container.innerHTML = '<article id="blog-container"></article>';
    stateMap.container = document.getElementById('blog-container');

    //グローバルカスタムイベントのバインド
    spa.gevent.subscribe( 'spa', 'load-blog',  onLoad  );

    blog_model.load(configMap.anchor.page);

  };

  // return public methods
  return {
    configModule: configModule,
    initModule: initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
})();

spa.blog.template = ({tags, date, title, content}) => {
  return `
    <div class="blog-content mdl-grid">
      <div class="mdl-card mdl-cell--12-col mdl-shadow--2dp">
        <header class="blog-header">
          <span>${tags}&nbsp;|&nbsp;${date}</span>
        </header>
        <div class="mdl-card__title">
          <h2>${title}</h2>
        </div>
        <div class="blog-section mdl-card__supporting-text">
          ${content}
        </div>
      </div>
      <nav class="blog-nav mdl-cell mdl-cell--12-col">
        <button id="blog-back" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" >
          <i class="material-icons" role="presentation">arrow_back</i>
        </button>
        <span class="mdl-tooltip" for="blog-back">前の画面</span> 
      </nav>
    </div>`;
};
