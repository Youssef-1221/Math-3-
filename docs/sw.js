/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "3fb62992900212bf23d13663e107403e"
  }, {
    "url": "pwa-512x512.png",
    "revision": "a94471ede7223d08e050845ea4abf5cf"
  }, {
    "url": "pwa-192x192.png",
    "revision": "ed3e37868599cf4038f504fc95ebb2ef"
  }, {
    "url": "index.html",
    "revision": "1b54bc39ffad79d3fb83286df69af265"
  }, {
    "url": "icon.svg",
    "revision": "729b49c5242510062bcb7b298ad2197f"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "8aaa28918ff5d8aa45b1f3d731b73530"
  }, {
    "url": "diagrams/ode_copper_rod.png",
    "revision": "3e212ff83d2a1d83bb6f2d33ad1d6ace"
  }, {
    "url": "diagrams/double_tri_yx.png",
    "revision": "dbca99a65ffbf0e482f024d4465cdc5a"
  }, {
    "url": "diagrams/double_tri_3x2y10.png",
    "revision": "ffd5a0a429d375acda2f3afebf4b1b5a"
  }, {
    "url": "diagrams/double_square_cut.png",
    "revision": "b14a0c461bfdb4cb3e2f3f8d36921ba2"
  }, {
    "url": "diagrams/double_rect_D.png",
    "revision": "7f988f612327baa3923f5e5270c8be42"
  }, {
    "url": "diagrams/double_parabola_line.png",
    "revision": "d70d33aabdc36cc3cb515cd58647cf6a"
  }, {
    "url": "diagrams/area_parabola_x2.png",
    "revision": "2230a6d595518bd334412c12736cbcef"
  }, {
    "url": "diagrams/area_arctan_y_axis.png",
    "revision": "0aeddee8a35f7367d5ac54b9333ac94b"
  }, {
    "url": "diagrams/arc_x_2y32.png",
    "revision": "ee744c53b0f9d6ca548d4d3a62475827"
  }, {
    "url": "diagrams/arc_ln_cosx.png",
    "revision": "fab77ca70067a474c7f4e35899777964"
  }, {
    "url": "assets/index-CP4kifou.css",
    "revision": null
  }, {
    "url": "assets/index-BJhW6z96.js",
    "revision": null
  }, {
    "url": "assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size4-Regular-BF-4gkZK.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size3-Regular-CTq5MqoE.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size2-Regular-oD1tc_U0.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size2-Regular-Dy4dx90m.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size1-Regular-mCD8mA8B.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Size1-Regular-C195tn64.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Script-Regular-D5yQViql.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Script-Regular-D3wIWfF6.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Italic-DN2j7dab.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-Italic-t53AETM-.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-Italic-DA0__PXp.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Regular-Dr94JaBh.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Regular-B22Nviop.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Italic-NWA7e6Wa.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Italic-BMLOBm91.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-BoldItalic-SpSLRI95.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Bold-Jm3AIy58.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Main-Bold-Cx986IdX.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Fraktur-Bold-BsDP51OF.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2",
    "revision": null
  }, {
    "url": "assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_AMS-Regular-DMm9YOAa.woff",
    "revision": null
  }, {
    "url": "assets/KaTeX_AMS-Regular-BQhdFMY1.woff2",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "8aaa28918ff5d8aa45b1f3d731b73530"
  }, {
    "url": "icon.svg",
    "revision": "729b49c5242510062bcb7b298ad2197f"
  }, {
    "url": "pwa-192x192.png",
    "revision": "ed3e37868599cf4038f504fc95ebb2ef"
  }, {
    "url": "pwa-512x512.png",
    "revision": "a94471ede7223d08e050845ea4abf5cf"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "3fb62992900212bf23d13663e107403e"
  }, {
    "url": "diagrams/arc_ln_cosx.png",
    "revision": "fab77ca70067a474c7f4e35899777964"
  }, {
    "url": "diagrams/arc_x_2y32.png",
    "revision": "ee744c53b0f9d6ca548d4d3a62475827"
  }, {
    "url": "diagrams/area_arctan_y_axis.png",
    "revision": "0aeddee8a35f7367d5ac54b9333ac94b"
  }, {
    "url": "diagrams/area_parabola_x2.png",
    "revision": "2230a6d595518bd334412c12736cbcef"
  }, {
    "url": "diagrams/double_parabola_line.png",
    "revision": "d70d33aabdc36cc3cb515cd58647cf6a"
  }, {
    "url": "diagrams/double_rect_D.png",
    "revision": "7f988f612327baa3923f5e5270c8be42"
  }, {
    "url": "diagrams/double_square_cut.png",
    "revision": "b14a0c461bfdb4cb3e2f3f8d36921ba2"
  }, {
    "url": "diagrams/double_tri_3x2y10.png",
    "revision": "ffd5a0a429d375acda2f3afebf4b1b5a"
  }, {
    "url": "diagrams/double_tri_yx.png",
    "revision": "dbca99a65ffbf0e482f024d4465cdc5a"
  }, {
    "url": "diagrams/ode_copper_rod.png",
    "revision": "3e212ff83d2a1d83bb6f2d33ad1d6ace"
  }, {
    "url": "manifest.webmanifest",
    "revision": "c8657b862cc58be294aa58c114999ead"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
