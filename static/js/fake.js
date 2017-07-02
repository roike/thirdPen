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
  const fakedata = [
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
    },
    {
      key: 'abcdef_slug',
      title: 'test-4',
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
      title: 'test-5',
      tags: 'test',
      slug: 'slug',
      excerpt: 'This is the mock data.',
      content: 'This is the mock data.',
      channel: 'tech',
      date: 'June 15, 2016',
      initdate: 'May 15, 2016'
    }
  ];

  return {
    identify: {
      appid: 'third-pen',
      token: 'thirdpen',
      anchor: '/home'
    },
    home: {publish: fakedata.slice(0,1)},
    tech: {publish: fakedata.slice(0,2)},
    think: {publish: fakedata.slice(0,3)},
    github: {publish: fakedata.slice(0,4)},
    euler: {publish: fakedata}
    };
})();
