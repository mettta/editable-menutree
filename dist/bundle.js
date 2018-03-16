/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
      var valB = pug_style(b[key]);
      valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    return val + '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(7).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(2);

__webpack_require__(11);

var el = document.createElement('div');
el.classList.add('js-app');
document.body.append(el);

new _app.App({
	el: el
});

// Initialize Firebase
var config = {
	apiKey: "AIzaSyA6MrUgAlk-MI9ALoS0wDrBGihokS1J-EQ",
	authDomain: "editable-tree.firebaseapp.com",
	databaseURL: "https://editable-tree.firebaseio.com",
	projectId: "editable-tree",
	storageBucket: "",
	messagingSenderId: "1087544042407"
};
firebase.initializeApp(config);

var TESTDATA = firebase.database().ref();

TESTDATA.on("value", function (snapshot) {
	console.log(snapshot.val());
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.App = exports.APP_ENDPOINT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tree = __webpack_require__(3);

var _menutree = __webpack_require__(4);

var _additem = __webpack_require__(8);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var APP_ENDPOINT = exports.APP_ENDPOINT = '_data/data.json';

var App = exports.App = function () {
	function App(_ref) {
		var _this = this;

		var el = _ref.el;

		_classCallCheck(this, App);

		this.el = el;

		this.tree = new _tree.Tree();

		this.menutree = new _menutree.Menutree({
			el: document.createElement('div'),
			tree: this.tree,
			onItemEvent: function onItemEvent(element) {
				_this.form.update(element);
			}
		});

		this.form = new _additem.Additem({
			el: document.createElement('div'),
			onSendData: function onSendData(element, address) {
				_this.menutree.addElement(element, address);
				// TODO setData()
				// this.postData(this.tree.setData());
			}
		});

		this.el.append(this.menutree.el, this.form.el);
		this.menutree.render();
		this.form.render();

		this.fetchData();
	}

	_createClass(App, [{
		key: 'fetchData',
		value: function fetchData() {
			var _this2 = this;

			fetch(APP_ENDPOINT).then(function (res) {
				return res.json();
			}).then(function (_ref2) {
				var tree = _ref2.tree;

				_this2.tree.data = tree;
				_this2.menutree.render();
			});
		}

		// не используется в песочнице:

	}, {
		key: 'postData',
		value: function postData(data) {
			fetch(APP_ENDPOINT, {
				method: 'POST', // or 'PUT'
				body: JSON.stringify(data),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).then(function (res) {
				return res.json();
			}).catch(function (error) {
				return console.error('Error:', error);
			}).then(function (response) {
				return console.log('Success:', response);
			});
		}
	}]);

	return App;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = exports.Tree = function () {
	function Tree() {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

		_classCallCheck(this, Tree);

		this.data = data;
	}

	_createClass(Tree, [{
		key: 'getData',
		value: function getData() {
			return this.data;
		}
	}, {
		key: 'getAdaptedData',
		value: function getAdaptedData() {
			this._adaptData(this.data, []);
			return this.data;
		}
	}, {
		key: '_adaptData',
		value: function _adaptData(data, address) {
			var _this = this;

			var currAddress = address;
			data.forEach(function (obj, idx) {
				obj.address = currAddress.concat(idx);
				if (obj.children) {
					_this._adaptData(obj.children, obj.address);
				};
			});
		}
	}, {
		key: 'getNodeIdx',
		value: function getNodeIdx(address) {
			return address && address.length ? address[address.length - 1] : undefined;
		}
	}, {
		key: 'getNode',
		value: function getNode(address) {
			return address && address.length ? this.getParentNode(address)[this.getNodeIdx(address)] : undefined;
		}
	}, {
		key: 'getParentNode',
		value: function getParentNode(address) {
			var parentNode = this.data;
			if (address) {
				for (var i = 0; i < address.length - 1; i++) {
					parentNode = parentNode[+address[i]].children;
				}
			}
			return parentNode;
		}
	}, {
		key: 'getChildren',
		value: function getChildren(address) {
			return address && address.length ? this.getNode(address).children : this.data;
		}
	}, {
		key: 'addNode',
		value: function addNode(el, address) {
			if (!el || !el.name) {
				return;
			}

			if (!address) {
				this.data.push(el);
				return;
			}

			var children = this.getChildren(address);
			var parent = this.getNode(address);

			if (!children) {
				parent.children = [el];
			} else {
				children.push(el);
			}

			if (parent) {
				parent.state = 'open';
			}
		}
	}, {
		key: 'removeNode',
		value: function removeNode(address) {
			if (!address || !address.length) {
				return;
			}
			var idx = this.getNodeIdx(address);
			var arr = this.getParentNode(address);
			arr.splice(idx, 1);
		}
	}]);

	return Tree;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Menutree = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(5);

var _menutree = __webpack_require__(6);

var _menutree2 = _interopRequireDefault(_menutree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menutree = exports.Menutree = function () {
	function Menutree(_ref) {
		var el = _ref.el,
		    tree = _ref.tree,
		    onItemEvent = _ref.onItemEvent;

		_classCallCheck(this, Menutree);

		this.el = el;

		this._tree = tree;
		this._onItemEvent = onItemEvent;

		this._blockName = "menutree";
		this.el.classList.add(this._blockName);
		this._initEvents();
	}

	_createClass(Menutree, [{
		key: 'render',
		value: function render() {
			this.el.innerHTML = (0, _menutree2.default)({
				blockName: this._blockName,
				data: this._tree.getAdaptedData()
			});
		}
	}, {
		key: 'addElement',
		value: function addElement(el, address) {
			this._addElementToTree(el, address);
			console.log(address);
			this.render();
		}
	}, {
		key: 'removeElement',
		value: function removeElement(el) {
			this._tree.removeNode(this._getElementAddress(el));
			this.render();
		}
	}, {
		key: '_getElementAddress',
		value: function _getElementAddress(el) {
			var elemIdx = el.parentNode.dataset.idx;
			var address = elemIdx ? elemIdx.split('.') : [];
			return address;
		}
	}, {
		key: '_addElementToTree',
		value: function _addElementToTree(el, address) {
			this._tree.addNode(el, address);
		}
	}, {
		key: '_toggleOpenStatus',
		value: function _toggleOpenStatus(el) {
			el.classList.toggle(this._blockName + '__section_title_open');
			var node = this._tree.getNode(this._getElementAddress(el));
			var state = node.state;
			node.state = state ? '' : 'open';
		}
	}, {
		key: '_initEvents',
		value: function _initEvents() {
			var _this = this;

			this.el.addEventListener('click', function () {
				var element = event.target;

				if (element.classList.contains(_this._blockName + '__section_title')) {
					_this._toggleOpenStatus(element);
				}

				if (element.classList.contains(_this._blockName + '__item_del')) {
					_this.removeElement(element);
					_this._onItemEvent(null);
				}

				if (element.classList.contains(_this._blockName + '__item_add')) {
					_this._onItemEvent({
						title: element.parentNode.querySelector('.' + _this._blockName + '__title').textContent,
						address: _this._getElementAddress(element)
					});
				}
			});
		}
	}]);

	return Menutree;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (blockName, data) {pug_mixins["list"] = pug_interp = function(data){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cul" + (pug.attr("class", pug.classes([blockName + '__section'], [true]), false, true)) + "\u003E";
// iterate data
;(function(){
  var $$obj = data;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var obj = $$obj[pug_index0];
pug_mixins["item"](obj);
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var obj = $$obj[pug_index0];
pug_mixins["item"](obj);
    }
  }
}).call(this);

pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([blockName + '__placeholder'], [true]), false, true)) + "\u003EВаш список пуст\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
};
pug_mixins["item"] = pug_interp = function(obj){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if (obj.name) {
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([blockName + '__item'], [true]), false, true)+pug.attr("data-idx", obj.address.join('.'), true, true)) + "\u003E\u003Cspan" + (pug.attr("class", pug.classes([blockName + '__item_del'], [true]), false, true)) + "\u003E&times;\u003C\u002Fspan\u003E";
if (obj.url) {
pug_mixins["link"](obj);
}
else {
pug_mixins["title"](obj);
}
if (obj.children) {
pug_mixins["list"](obj.children);
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
}
};
pug_mixins["link"] = pug_interp = function(obj){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Ca" + (pug.attr("class", pug.classes([blockName + '__link'], [true]), false, true)+pug.attr("href", obj.url, true, true)+" target=\"_blank\"") + "\u003E" + (pug.escape(null == (pug_interp = obj.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
};
pug_mixins["title"] = pug_interp = function(obj){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([blockName + '__item_add'], [true]), false, true)) + "\u003E&plus;\u003C\u002Fspan\u003E\u003Cspan" + (pug.attr("class", pug.classes([blockName + '__title',(obj.children && obj.children.length && obj.state == 'open') ? blockName + '__section_title_open' : '',(obj.children && obj.children.length) ? blockName + '__section_title' : ''], [true,true,true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = obj.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["list"](data);}.call(this,"blockName" in locals_for_with?locals_for_with.blockName:typeof blockName!=="undefined"?blockName:undefined,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Additem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(9);

var _additem = __webpack_require__(10);

var _additem2 = _interopRequireDefault(_additem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Additem = exports.Additem = function () {
	function Additem(_ref) {
		var el = _ref.el,
		    onSendData = _ref.onSendData;

		_classCallCheck(this, Additem);

		this.el = el;

		this._onSendData = onSendData;

		this._blockName = "additem";
		this.el.classList.add(this._blockName);
		this._initEvents();

		this._targetTitle = null;
		this._targetAddress = null;
	}

	_createClass(Additem, [{
		key: 'render',
		value: function render() {
			this.el.innerHTML = (0, _additem2.default)({
				blockName: this._blockName,
				targetTitle: this._targetTitle
			});
		}
	}, {
		key: 'reset',
		value: function reset() {
			this._targetTitle = null;
			this._targetAddress = null;
			this.render();
		}
	}, {
		key: 'update',
		value: function update(element) {
			if (element) {
				this._setTarget(element);
				this.render();
			} else {
				this.reset();
			}
		}

		// private

	}, {
		key: '_setTarget',
		value: function _setTarget(element) {
			this._targetTitle = element.title;
			this._targetAddress = element.address;
		}
	}, {
		key: '_initEvents',
		value: function _initEvents() {
			var _this = this;

			this.el.addEventListener('click', function () {
				if (!event.target.classList.contains(_this._blockName + '__submit')) return;
				var newEl = {};
				event.target.parentNode.querySelectorAll('input').forEach(function (el) {
					newEl[el.name] = el.value;
				});
				_this._sendData(newEl);
			});
		}
	}, {
		key: '_sendData',
		value: function _sendData(el) {
			this._onSendData(el, this._targetAddress);
			this.reset();
		}
	}]);

	return Additem;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (blockName, targetTitle) {pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([blockName + '__form'], [true]), false, true)) + "\u003E\u003Cp\u003EДобавить элемент";
if (targetTitle) {
pug_html = pug_html + "\u003Cmark\u003Eв&nbsp; \u003Ci\u003E" + (pug.escape(null == (pug_interp = targetTitle + ': ') ? "" : pug_interp)) + "\u003C\u002Fi\u003E\u003C\u002Fmark\u003E";
}
pug_html = pug_html + "\u003C\u002Fp\u003E\u003Cinput type=\"text\" name=\"name\" placeholder=\"Название\" value=\"\"\u003E\u003Cinput type=\"text\" name=\"url\" placeholder=\"http:\u002F\u002F..\" value=\"\"\u003E\u003Cbutton" + (pug.attr("class", pug.classes([blockName + '__submit'], [true]), false, true)) + "\u003Eдобавить\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";}.call(this,"blockName" in locals_for_with?locals_for_with.blockName:typeof blockName!=="undefined"?blockName:undefined,"targetTitle" in locals_for_with?locals_for_with.targetTitle:typeof targetTitle!=="undefined"?targetTitle:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map