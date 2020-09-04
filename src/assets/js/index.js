
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slide = /*#__PURE__*/function () {
    function Slide(node, opt) {
        _classCallCheck(this, Slide);

        this.opt = opt || {};
        this.option = Object.assign({
            btn: '[data-button]',
            box: '[data-box-dropdown]',
            indicator: '[data-indicator]',
            title: '[data-title]',
            transition: 600,
            maxHeight: 200,
            onOpen: null
        }, this.opt);
        var _this$option = this.option,
            btn = _this$option.btn,
            box = _this$option.box,
            indicator = _this$option.indicator,
            title = _this$option.title,
            item = _this$option.item,
            resetItem = _this$option.resetItem,
            input = _this$option.input,
            transition = _this$option.transition,
            maxHeight = _this$option.maxHeight,
            onOpen = _this$option.onOpen;
        this.node = node;
        this.btn = this.node.querySelector(btn) || null;
        this.title = this.node.querySelector(title) || null;
        this.box = this.node.querySelector(box) || null;
        this.indicator = this.node.querySelector(indicator) || null;

        if (this.indicator) {
            this.indicator.style.transition = transition + 'ms';
        }

        this.firstTitle = this.title.textContent;
        this.maxHeight = maxHeight;
        this.heightBox = null;
        this.open = false;
        this.count = null;
    }

    _createClass(Slide, [{
        key: "down",
        value: function down() {
            var _this = this;
            _this.parentBox = _this.box.closest('.form-main-row');

            _this.count = _this.parentBox.dataset.zIndex;

            _this.parentBox.style.zIndex = _this.count + '';

            function getSizeBoxes(elem) {
                var elemWidth = elem.getBoundingClientRect().right - elem.getBoundingClientRect().left;
                var elemHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;
                return {
                    width: elemWidth,
                    height: elemHeight
                };
            }

            var downBlock = new Promise(function (resolve, reject) {
                _this.box.style.opacity = '0';
                _this.box.style.height = 'auto';
                _this.box.style.display = 'block';
                _this.heightBox = getSizeBoxes(_this.box).height;
                _this.box.style.height = '0';
                resolve();
            }).then(function () {
                setTimeout(function () {
                    _this.box.style.transition = _this.option.transition + 'ms';
                    _this.box.style.opacity = '1';

                    if (_this.maxHeight >= _this.heightBox) {
                        _this.box.style.height = _this.heightBox + 'px';
                    } else {
                        _this.box.style.overflowY = "auto";
                        _this.box.style.height = _this.maxHeight + 'px';
                    }

                    _this.indicator.style.transition = _this.option.transition + 'ms';

                    _this.indicator.classList.add('open');
                }, 0);
            }).then(function () {
                setTimeout(function () {
                    _this.open = true;
                }, _this.option.transition);
            });
        }
    }, {
        key: "up",
        value: function up() {
            var _this2 = this;
            _this2.parentBox = _this2.box.closest('.form-main-row');

            var upBlock = new Promise(function (resolve, reject) {
                _this2.box.style.height = '0';
                _this2.box.style.opacity = '0';

                _this2.indicator.classList.remove('open');

                resolve();
            }).then(function () {
                setTimeout(function () {
                    _this2.box.style.overflowY = "hidden";
                    _this2.box.style.display = 'none';
                    _this2.open = false;
                    _this2.parentBox.style.zIndex = '1';
                }, _this2.option.transition);
            });
        }
    }, {
        key: "toggle",
        value: function toggle() {
            this.open ? this.up() : this.down();
        }
    }]);

    return Slide;
}();

var SelectBox = /*#__PURE__*/function (_Slide) {
    _inherits(SelectBox, _Slide);

    var _super = _createSuper(SelectBox);

    function SelectBox(node, opt) {
        var _this3;

        _classCallCheck(this, SelectBox);

        _this3 = _super.call(this, node, opt);
        _this3.currentOption = Object.assign({
            item: '[data-item]',
            resetItem: '[data-reset]',
            input: '[data-input]'
        }, _this3.opt);
        var _this3$currentOption = _this3.currentOption,
            item = _this3$currentOption.item,
            resetItem = _this3$currentOption.resetItem,
            input = _this3$currentOption.input;
        _this3.input = _this3.node.querySelector(input) || null;
        _this3.resetItem = _this3.node.querySelector(resetItem) || null;
        _this3.item = [].slice.call(_this3.node.querySelectorAll(item), 0) || null;
        _this3.toggle = _this3.toggle.bind(_assertThisInitialized(_this3));
        _this3.up = _this3.up.bind(_assertThisInitialized(_this3));
        return _this3;
    }

    _createClass(SelectBox, [{
        key: "btnClick",
        value: function btnClick() {
            this.btn.addEventListener('click', this.toggle);
        }
    }, {
        key: "itemClick",
        value: function itemClick() {
            if (!this.item.length) {
                return;
            }

            var self = this;
            this.item.forEach(function (item, ind) {
                item.addEventListener('click', function () {
                    self.item.forEach(function (el, i) {
                        el.classList.remove('active');

                        if (i === ind) {
                            el.classList.add('active');
                        }
                    });
                    self.setValue(item);
                    setTimeout(self.up, 600);
                });
            });
        }
    }, {
        key: "resetClick",
        value: function resetClick() {
            if (!this.resetItem) {
                return;
            }

            var self = this;
            this.resetItem.addEventListener('click', function () {
                self.item.forEach(function (el) {
                    el.classList.remove('active');
                });
                self.resetValue();
                setTimeout(self.up, 600);
            });
        }
    }, {
        key: "setValue",
        value: function setValue(item) {
            if (!this.input && this.title) {
                return;
            }

            this.input.setAttribute('value', item.dataset.item);
            this.title.textContent = this.input.value;
        }
    }, {
        key: "resetValue",
        value: function resetValue() {
            if (!this.resetItem) {
                return;
            }

            this.input.setAttribute('value', this.resetItem.dataset.reset);
            this.title.textContent = this.firstTitle;
        }
    }, {
        key: "init",
        value: function init() {
            this.btnClick();
            this.itemClick();
            this.resetClick();
        }
    }]);

    return SelectBox;
}(Slide);

function PagePopup(popup) {
    var _s = this;
    _s.popup = document.querySelector('[data-popup="' + popup + '"]');
    _s.btnClose = _s.popup.querySelectorAll('[data-close-popup]');
    _s.listPopup = document.querySelectorAll('[data-popup]');
    _s.transition = 300;

    _s.change = function() {
        for (var i = 0; i < _s.listPopup.length; i++) {
            if (_s.listPopup[i].classList.contains('open')) {
                _s.close(_s.listPopup[i]);

                setTimeout(_s.open, _s.transition);
            } else {
                _s.open();
            }
        }
    }

    _s.open = function () {
        _s.popup.style.display = 'block';

        setTimeout(function () {
            _s.popup.classList.add('open');
        },0)
    }

    _s.close = function (popup) {
        popup.classList.remove('open');

        setTimeout(function () {
            popup.style.display = 'none';
        },_s.transition);
    }

    _s.closeCurrentPopup = function () {
        _s.popup.classList.remove('open');

        setTimeout(function () {
            _s.popup.style.display = 'none';
        },_s.transition);
    }

    _s.init = function () {
        for (var i = 0; i < _s.btnClose.length; i++ ) {
            _s.btnClose[i].addEventListener('click', function () {
                _s.close(_s.popup);
            })
        }
    }

    return {
        change: _s.change,
        open: _s.open,
        init: _s.init,
        close: _s.closeCurrentPopup
    }
}

function openPopup(popup) {
    var p = new PagePopup(popup);
    p.change();
}

function closePopup(popup) {
    var p = new PagePopup(popup);
    p.close();
}


window.addEventListener('load', function () {
    if (document.querySelectorAll('.accordion-item').length) {
        var slides = document.querySelectorAll('.accordion-item');

        [].forEach.call(slides, function (el) {
            var select = new SelectBox(el, { transition: 200, maxHeight: 250 });
            select.init();
        });
    }

    if (document.querySelectorAll('[data-popup]').length) {
        var listBtnOpenPopup = document.querySelectorAll('[data-open-popup]');

        for (let i = 0; i < listBtnOpenPopup.length; i++) {
            let popup = listBtnOpenPopup[i].dataset.openPopup;

            listBtnOpenPopup[i].popup = new PagePopup(popup);

            listBtnOpenPopup[i].popup.init();
        }

        for (var i = 0; i < listBtnOpenPopup.length; i++) {
            listBtnOpenPopup[i].addEventListener('click', function () {
                this.popup.change();
            })
        }
    }
});