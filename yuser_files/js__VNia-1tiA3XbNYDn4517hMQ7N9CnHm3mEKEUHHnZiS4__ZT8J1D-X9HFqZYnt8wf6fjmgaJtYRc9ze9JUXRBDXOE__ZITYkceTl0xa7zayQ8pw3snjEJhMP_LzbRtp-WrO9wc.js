/* Source and licensing information for the line(s) below can be found at http://localhost:8888/pmf/sites/all/modules/authcache/authcache.js. */
(function(Drupal,$){"use strict";$.authcache_cookie=function(name,value,lifetime){lifetime=(typeof lifetime==='undefined')?Drupal.settings.authcache.cl:lifetime;$.cookie(name,value,$.extend(Drupal.settings.authcache.cp,{expires:lifetime}))}}(Drupal,jQuery));;
/* Source and licensing information for the above line(s) can be found at http://localhost:8888/pmf/sites/all/modules/authcache/authcache.js. */
