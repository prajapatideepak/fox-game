// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.togglePoopBag = exports.modScane = exports.modFox = void 0;

const modFox = function modFox(state) {
  document.querySelector('.fox').classList = `fox fox-${state}`;
};

exports.modFox = modFox;

const modScane = function modScane(state) {
  document.querySelector('.game').className = `game ${state}`;
};

exports.modScane = modScane;

const togglePoopBag = function togglePoopBag(show) {
  document.querySelector('.poop-bag').classList.toggle("hidden", !show);
};

exports.togglePoopBag = togglePoopBag;
},{}],"constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextDiedTime = exports.getNextHungerTime = exports.SLEEP_TIME = exports.WAKE_TIME = exports.RAIN_CHANCE = exports.SCANE = exports.ICON = exports.TIME_RATE = void 0;
const TIME_RATE = 3000;
exports.TIME_RATE = TIME_RATE;
const ICON = ['fish', 'poop', 'weather'];
exports.ICON = ICON;
const SCANE = ['day', 'rain'];
exports.SCANE = SCANE;
const RAIN_CHANCE = 0.9;
exports.RAIN_CHANCE = RAIN_CHANCE;
const WAKE_TIME = 5;
exports.WAKE_TIME = WAKE_TIME;
const SLEEP_TIME = 5;
exports.SLEEP_TIME = SLEEP_TIME;

const getNextHungerTime = clock => Math.floor(Math.random() * 3) + 5 + clock;

exports.getNextHungerTime = getNextHungerTime;

const getNextDiedTime = clock => Math.floor(Math.random() * 3) + 5 + clock;

exports.getNextDiedTime = getNextDiedTime;
},{}],"gameState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.handleuserAction = void 0;

var _ui = require("./ui");

var _constants = require("./constants");

const gameState = {
  current: "INIT",
  clock: 1,
  wakes: -1,
  sleepTIme: -1,
  hungertime: -1,
  diedTime: -1,

  tick() {
    this.clock += 1;
    console.log("clock :", this.clock);

    if (this.clock === this.wakes) {
      this.wake();
    } else if (this.clock === this.sleepTIme) {
      this.sleep();
    } else if (this.clock === this.hungertime) {
      this.hunger();
    } else if (this.clock === this.diedTime) {
      this.died();
    }

    return this.clock;
  },

  startGame() {
    this.current = "HATCHING";
    console.log(this.current);
    this.wakes = this.clock + 3;
    (0, _ui.modFox)('egg');
    (0, _ui.modScane)('day');
  },

  wake() {
    this.current = "IDLING ";
    this.wakes = -1;
    console.log('awoken');
    (0, _ui.modFox)('idling');
    this.scane = Math.random > _constants.RAIN_CHANCE ? 0 : 1;
    (0, _ui.modScane)(_constants.SCANE[this.scane]);
    this.sleepTIme = this.clock + _constants.WAKE_TIME;
    this.hungertime = (0, _constants.getNextHungerTime)(this.clock);
  },

  sleep() {
    this.current = "SLEEP";
    (0, _ui.modScane)('night');
    (0, _ui.modFox)('sleep');
    this.wakes = this.clock + _constants.SLEEP_TIME;
  },

  hunger() {
    this.current = "HUNGRY";
    (0, _ui.modFox)('hungry');
    this.hungertime = -1;
    this.diedTime = (0, _constants.getNextDiedTime)(this.clock);
  },

  died() {
    this.current = "DIED";
    console.log("mar gaya ");
    this.diedTime = -1;
  },

  handleuserAction(icon) {
    console.log(icon);

    if (["CELEBRATING", "SLEEP", "FEEDING", "HATCHING"].includes(this.current)) {
      // Do nothing 
      return;
    }

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }

    switch (icon) {
      case "weather":
        this.changeWeather();
        break;

      case "poop":
        this.clearUpPoop();
        break;

      case "fish":
        this.feed();
        break;
    }
  },

  changeWeather() {
    console.log('weather');
  },

  clearUpPoop() {
    console.log("cleanning the poop");
  },

  feed() {
    console.log("feed");
  }

}; //window.gameState = 

const handleuserAction = gameState.handleuserAction.bind(gameState);
exports.handleuserAction = handleuserAction;
var _default = gameState;
exports.default = _default;
},{"./ui":"ui.js","./constants":"constants.js"}],"buttons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initButtons;

var _constants = require("./constants.js");

const toggleHighlighted = (icon, show) => {
  document.querySelector(`.${_constants.ICON[icon]}-icon`).classList.toggle("highlighted", show);
};

function initButtons(handleuserAction) {
  let selectedIcon = 0;

  function buttonclick({
    target
  }) {
    if (target.classList.contains('left-btn')) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (2 + selectedIcon) % _constants.ICON.length;
      toggleHighlighted(selectedIcon, true);
    } else if (target.classList.contains('right-btn')) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (1 + selectedIcon) % _constants.ICON.length;
      toggleHighlighted(selectedIcon, true);
    } else {
      handleuserAction(_constants.ICON[selectedIcon]);
    }
  }

  document.querySelector(".buttons").addEventListener("click", buttonclick);
}
},{"./constants.js":"constants.js"}],"init.js":[function(require,module,exports) {
"use strict";

var _gameState = _interopRequireWildcard(require("./gameState"));

var _constants = require("./constants.js");

var _buttons = _interopRequireDefault(require("./buttons.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function init() {
  console.log('Starting game');
  (0, _buttons.default)(_gameState.handleuserAction);
  let nextTimeTotick = Date.now();

  function nextanimationframe() {
    const now = Date.now(); // console.log(now , nextTimeTotick)

    if (nextTimeTotick <= now) {
      _gameState.default.tick();

      nextTimeTotick = now + _constants.TIME_RATE;
    }

    requestAnimationFrame(nextanimationframe);
  }

  nextanimationframe();
}

init();
},{"./gameState":"gameState.js","./constants.js":"constants.js","./buttons.js":"buttons.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55511" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","init.js"], null)
//# sourceMappingURL=/init.9d6cb373.js.map