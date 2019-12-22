---
title: "ilcorsaronero-api: get italian torrents"
description: Node.js module to search and get italian torrents on ilcorsaronero.info
date: 2015-12-20 02:14:12
image: "./ilcorsaronero-api.jpg"
imageAlt: panda with laptop
slug: blog/ilcorsaronero-api-node-js-module-to-get-italian-torrents
imgAuthor: me
---

Hello guys, today we're going to talk of another minor minor (minor) project that is coming to life thanks to another big project of mine that I should have already released but due to my slowness I'm still not ready to show it (yes, I'm talking of the same project I was talking in this [other post](http://blog.giacomocerquone.com/loading-animation-with-pure-css/)). Anyway let's talk about what this module I developed does and how.

## What was I trying to accomplish?

So my goal was to search in node for italian torrents and the only good italian torrent search engine that I know is ilcorsaronero.info, it's not so much different than KickAss, The Pirate Bay etc.
Since they doesn't have any kind of API, I needed to scrape these information ([here](https://en.wikipedia.org/wiki/Web_scraping) if you don't know what's this technique) and when we talk about "scraping" only two libraries come to the mind of a node developer: cheeriojs and request. The first one is, in two words, a server side jquery implementation and second is used to make requests and get the html of a webpage... they make the art of web scraping a child's play.

Before we look at the code, [here the github page](https://github.com/giacomocerquone/ilcorsaronero-api) and [here the npm page](https://www.npmjs.com/package/ilcorsaronero-api)

## Talking is for pussies, coding is for real men

So let's see the most important piece of code of this library just to show what I did technically (a lot of lines has been deleted down here) :

```javascript
function scrape(url, cat, callback) {

  request(url, function (error, response, body) {
    if (!error &amp;&amp; response.statusCode == 200) {
      var $ = cheerio.load(body);

      // We'll store retrieved data here
      var result = [],
          counter = 0,
          items = $('.odd, .odd2');

      items.each(function(i, row) {
        // Unluckily the magnets are not accessible from the search page. We must access the torrent page and get the magnet
        request( $(row).children('td').eq(1).children('a').attr("href"), function(error, response, body) {
          if (!error &amp;&amp; response.statusCode == 200) {
            var $2 = cheerio.load(body),
                catScraped = $(row).children('td').eq(0).children('a').text(),
                name = $2('#content &gt; #body &gt; center').text(),
                link = $2('.magnet').attr('href'),
                size = $(row).children('td').eq(2).text(),
                date = $(row).children('td').eq(4).text(),
                seeds = $(row).children('td').eq(5).text(),
                peers = $(row).children('td').eq(6).text();

              result.push( { "cat": catScraped, "name": name, "link": link, "size": size, "date": date, "seeds": seeds, "peers": peers } );

            counter++;
            if(counter == items.length) {
              callback(null, result);
            }
          }
        });
      });
    }
  });
}
```

I defined a "scrape" function within, with request, I requested the "html" of a webpage passed through parameter. After I passed as parameter to cheerio the webpage in order to use the classical jquery selector to get attributes, texts and everything else we need. You see two requests in the code: the first is the search page, and for every item resulted from the search it will request for another link (due to the structure of ilcorsaronero that doesn't expose the magnet links in the search page). And at the end there is a callback call (of course the code is async and a callback is required to get the scraped results).

## Final Notes

I hope someone will appreciate this and if you do something great with this library make me know about it through comments or privately on social network!
Stay awesome guys :D
