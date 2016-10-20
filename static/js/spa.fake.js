/*
 * thirdpen spa.fake.js
 * See License
 */

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, spa */

spa.fake = (function () {
  'use strict';

  const mockAjax = (() => {
    const mockGet = url => {
      const pageList = url.split('/');
      const tindex = pageList.indexOf('thirdpen') + 1;
      const mockKey = pageList[tindex];
      return new Promise((resolve, reject) => {
        resolve(spa.fake.data[mockKey]);
        reject();
      });
    };

    const mockPost = (url, params) => {
      const mockKey = _.last(url.split('/'));
      return new Promise((resolve, reject) => {
        resolve(spa.fake.data[mockKey]);
        reject();
      });
    };
      
    return {
      get: mockGet,
      post: mockPost
    };

  })();

  
  return {
    mockAjax : mockAjax
  };
})();

spa.fake.data = (() => {
  return {
    identify: {
      appid: 'third-pen',
      token: 'thirdpen',
      anchor: '/home'
    },
    home: {
      publish: [
      {
        key: 'abcdef_slug',
        title: 'test-1',
        tags: 'test',
        slug: 'aboutme',
        excerpt: 'This is the mock data.',
        content: 'This is the mock data.',
        channel: 'home',
        date: 'June 15, 2016',
        initdate: 'May 15, 2016'
      }]},
    tech: {
      publish: [
      {
        key: 'abcdef_slug',
        title: 'test-1',
        tags: 'test',
        slug: 'aboutme',
        excerpt: 'This is the mock data.',
        content: 'This is the mock data.',
        channel: 'tech',
        date: 'June 15, 2016',
        initdate: 'May 15, 2016'
      },
      {
        key: 'abcdef_slug',
        title: 'test-2',
        tags: 'test',
        slug: 'slug',
        excerpt: 'This is the mock data.',
        content: 'This is the mock data.',
        channel: 'tech',
        date: 'June 15, 2016',
        initdate: 'May 15, 2016'
      },
      {
        key: 'abcdef_slug',
        title: 'test-3',
        tags: 'test',
        slug: 'slug',
        excerpt: 'This is the mock data.',
        content: 'This is the mock data.',
        channel: 'tech',
        date: 'June 15, 2016',
        initdate: 'May 15, 2016'
      }
      ]},
    think: {
      publish: [
      {
        key: 'abcdef_slug',
        title: 'test-1',
        tags: 'test',
        slug: 'aboutme',
        excerpt: 'This is the mock data.',
        content: 'This is the mock data.',
        channel: 'think',
        date: 'June 15, 2016',
        initdate: 'May 15, 2016'
      },
      {
        key: 'abcdef_slug',
        title: 'test-2',
        tags: 'test',
        slug: 'slug',
        excerpt: 'This is the mock data.',
        content: 'This is the mock data.',
        channel: 'think',
        date: 'June 15, 2016',
        initdate: 'May 15, 2016'
      },
      {
        key: 'abcdef_slug',
        title: 'test-3',
        tags: 'test',
        slug: 'slug',
        excerpt: 'This is the mock data.',
        content: 'This is the mock data.',
        channel: 'think',
        initdate: 'May 15, 2016',
        date: 'June 15, 2016'
      }
      ]}
    };
})();
