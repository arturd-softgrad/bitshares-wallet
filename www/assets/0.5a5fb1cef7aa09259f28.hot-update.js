webpackHotUpdate(0,{

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(63);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactTranslateComponent = __webpack_require__(315);
	
	var _reactTranslateComponent2 = _interopRequireDefault(_reactTranslateComponent);
	
	var _Transactions = __webpack_require__(325);
	
	var _Transactions2 = _interopRequireDefault(_Transactions);
	
	var _Balances = __webpack_require__(327);
	
	var _Balances2 = _interopRequireDefault(_Balances);
	
	var _AccountImage = __webpack_require__(328);
	
	var _AccountImage2 = _interopRequireDefault(_AccountImage);
	
	var _reactRouter = __webpack_require__(219);
	
	var DropDownMenu = __webpack_require__(333);
	
	// Flux HomeScreen view
	
	var HomeScreen = (function (_React$Component) {
	  _inherits(HomeScreen, _React$Component);
	
	  function HomeScreen(props) {
	    _classCallCheck(this, HomeScreen);
	
	    _get(Object.getPrototypeOf(HomeScreen.prototype), "constructor", this).call(this, props);
	  }
	
	  // Render HomeScreen view
	
	  _createClass(HomeScreen, [{
	    key: "render",
	    value: function render() {
	
	      return _react2["default"].createElement(
	        "section",
	        null,
	        _react2["default"].createElement(
	          "nav",
	          { className: "main-nav" },
	          _react2["default"].createElement(
	            "ul",
	            null,
	            _react2["default"].createElement(
	              "li",
	              { className: "active" },
	              _react2["default"].createElement(
	                "a",
	                { href: "#" },
	                _react2["default"].createElement(_reactTranslateComponent2["default"], { content: "wallet.home.balances" })
	              )
	            ),
	            _react2["default"].createElement(
	              "li",
	              null,
	              _react2["default"].createElement(
	                _reactRouter.Link,
	                { to: "contacts" },
	                _react2["default"].createElement(_reactTranslateComponent2["default"], { content: "wallet.home.contacts" })
	              )
	            ),
	            _react2["default"].createElement(
	              "li",
	              null,
	              _react2["default"].createElement(
	                "a",
	                { href: "#" },
	                _react2["default"].createElement(_reactTranslateComponent2["default"], { content: "wallet.home.finder" })
	              )
	            ),
	            _react2["default"].createElement(
	              "li",
	              null,
	              _react2["default"].createElement(
	                "a",
	                { href: "#" },
	                _react2["default"].createElement(_reactTranslateComponent2["default"], { content: "wallet.home.exchange" })
	              )
	            )
	          )
	        ),
	        _react2["default"].createElement(
	          "section",
	          { className: "code" },
	          _react2["default"].createElement(
	            "div",
	            { className: "code__item" },
	            _react2["default"].createElement(
	              "div",
	              { className: "code__item__img" },
	              _react2["default"].createElement("img", { src: "app/assets/img/QR.jpg", alt: "" })
	            ),
	            _react2["default"].createElement(
	              "div",
	              { className: "code__item__data" },
	              _react2["default"].createElement(
	                "div",
	                { className: "profile" },
	                _react2["default"].createElement(_AccountImage2["default"], { className: "profile-icon", account: "delegate.kencode" }),
	                _react2["default"].createElement(DropDownMenu, { menuItems: [{ payload: '1', text: 'delegate.kencode' }, { payload: '2', text: 'delegate.kencode2' }] }),
	                _react2["default"].createElement("span", null)
	              ),
	              _react2["default"].createElement(
	                "div",
	                { className: "data-text" },
	                "BTSFwmiD9C7h7Q8fHU9y3fAb5JhLCPBEzRZW3"
	              )
	            )
	          )
	        ),
	        _react2["default"].createElement(
	          "section",
	          { className: "code-buttons" },
	          _react2["default"].createElement(
	            _reactRouter.Link,
	            { to: "receive", className: "btn btn-receive" },
	            "receive"
	          ),
	          _react2["default"].createElement(
	            _reactRouter.Link,
	            { to: "send", className: "btn btn-send" },
	            "send"
	          )
	        ),
	        _react2["default"].createElement(_Balances2["default"], null),
	        _react2["default"].createElement(_Transactions2["default"], null)
	      );
	    }
	  }]);
	
	  return HomeScreen;
	})(_react2["default"].Component);
	
	;
	
	exports["default"] = HomeScreen;
	module.exports = exports["default"];

/***/ }

})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vYzovYml0c2hhcmVzd2FsbGV0L3d3dy9hcHAvY29tcG9uZW50cy9Ib21lU2NyZWVuLmpzeD8xYThmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FBa0IsRUFBTzs7OztvREFDSCxHQUEyQjs7Ozt5Q0FFeEIsR0FBZ0I7Ozs7cUNBQ3BCLEdBQVk7Ozs7eUNBQ1IsR0FBZ0I7Ozs7d0NBRU8sR0FBYzs7QUFDOUQsS0FBTSxZQUFZLEdBQUcsbUJBQU8sQ0FBQyxHQUFnQyxDQUFDLENBQUM7Ozs7S0FHekQsVUFBVTthQUFWLFVBQVU7O0FBRUQsWUFGVCxVQUFVLENBRUEsS0FBSyxFQUFFOzJCQUZqQixVQUFVOztBQUdWLGdDQUhBLFVBQVUsNkNBR0osS0FBSyxFQUFFO0lBQ2Q7Ozs7Z0JBSkMsVUFBVTs7WUFPTixrQkFBRzs7QUFFTixjQUNFOzs7U0FDRzs7YUFBSyxTQUFTLEVBQUMsVUFBVTtXQUN2Qjs7O2FBQ0U7O2lCQUFJLFNBQVMsRUFBQyxRQUFRO2VBQUM7O21CQUFHLElBQUksRUFBQyxHQUFHO2lCQUFDLHlFQUFXLE9BQU8sRUFBQyxzQkFBc0IsR0FBRztnQkFBSTtjQUFLO2FBQ3hGOzs7ZUFBSTs7bUJBQU0sRUFBRSxFQUFDLFVBQVU7aUJBQUMseUVBQVcsT0FBTyxFQUFDLHNCQUFzQixHQUFHO2dCQUFPO2NBQUs7YUFDaEY7OztlQUFJOzttQkFBRyxJQUFJLEVBQUMsR0FBRztpQkFBQyx5RUFBVyxPQUFPLEVBQUMsb0JBQW9CLEdBQUc7Z0JBQUk7Y0FBSzthQUNuRTs7O2VBQUk7O21CQUFHLElBQUksRUFBQyxHQUFHO2lCQUFDLHlFQUFXLE9BQU8sRUFBQyxzQkFBc0IsR0FBRztnQkFBSTtjQUFLO1lBQ2xFO1VBQ0Q7U0FDTjs7YUFBUyxTQUFTLEVBQUMsTUFBTTtXQUN2Qjs7ZUFBSyxTQUFTLEVBQUMsWUFBWTthQUN6Qjs7aUJBQUssU0FBUyxFQUFDLGlCQUFpQjtlQUFDLDBDQUFLLEdBQUcsRUFBQyx1QkFBdUIsRUFBQyxHQUFHLEVBQUMsRUFBRSxHQUFFO2NBQU07YUFDaEY7O2lCQUFLLFNBQVMsRUFBQyxrQkFBa0I7ZUFDL0I7O21CQUFLLFNBQVMsRUFBQyxTQUFTO2lCQUN0Qiw4REFBYyxTQUFTLEVBQUMsY0FBYyxFQUFDLE9BQU8sRUFBRSxrQkFBbUIsR0FBRztpQkFDdEUsaUNBQUMsWUFBWSxJQUFDLFNBQVMsRUFBRSxDQUN0QixFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLEVBQzFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsQ0FDNUMsR0FBRztpQkFDTCw4Q0FBYTtnQkFDVDtlQUNOOzttQkFBSyxTQUFTLEVBQUMsV0FBVzs7Z0JBQTRDO2NBQ2xFO1lBQ0Y7VUFDRTtTQUNWOzthQUFTLFNBQVMsRUFBQyxjQUFjO1dBQy9COztlQUFNLEVBQUUsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLGlCQUFpQjs7WUFBZTtXQUM3RDs7ZUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxjQUFjOztZQUFZO1VBQzVDO1NBQ1YsNkRBQVk7U0FDWixpRUFBZ0I7UUFDVixDQUNUO01BQ0o7OztVQTNDQyxVQUFVO0lBQVMsbUJBQU0sU0FBUzs7QUE0Q3ZDLEVBQUM7O3NCQUVhLFVBQVUiLCJmaWxlIjoiMC41YTVmYjFjZWY3YWEwOTI1OWYyOC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVHJhbnNsYXRlIGZyb20gXCJyZWFjdC10cmFuc2xhdGUtY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgVHJhbnNhY3Rpb25zIGZyb20gXCIuL1RyYW5zYWN0aW9uc1wiO1xyXG5pbXBvcnQgQmFsYW5jZXMgZnJvbSBcIi4vQmFsYW5jZXNcIjtcclxuaW1wb3J0IEFjY291bnRJbWFnZSBmcm9tIFwiLi9BY2NvdW50SW1hZ2VcIjtcclxuXHJcbmltcG9ydCB7IFJvdXRlciwgUm91dGUsIExpbmssIEluZGV4Um91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xyXG5jb25zdCBEcm9wRG93bk1lbnUgPSByZXF1aXJlKCdtYXRlcmlhbC11aS9saWIvZHJvcC1kb3duLW1lbnUnKTtcclxuXHJcbi8vIEZsdXggSG9tZVNjcmVlbiB2aWV3XHJcbmNsYXNzIEhvbWVTY3JlZW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW5kZXIgSG9tZVNjcmVlbiB2aWV3XHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgcmV0dXJuIChcclxuICAgICAgICAgPHNlY3Rpb24+XHJcbiAgICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwibWFpbi1uYXZcIj5cclxuICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCI+PGEgaHJlZj1cIiNcIj48VHJhbnNsYXRlIGNvbnRlbnQ9XCJ3YWxsZXQuaG9tZS5iYWxhbmNlc1wiIC8+PC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PExpbmsgdG89XCJjb250YWN0c1wiPjxUcmFuc2xhdGUgY29udGVudD1cIndhbGxldC5ob21lLmNvbnRhY3RzXCIgLz48L0xpbms+PC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiI1wiPjxUcmFuc2xhdGUgY29udGVudD1cIndhbGxldC5ob21lLmZpbmRlclwiIC8+PC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cIiNcIj48VHJhbnNsYXRlIGNvbnRlbnQ9XCJ3YWxsZXQuaG9tZS5leGNoYW5nZVwiIC8+PC9hPjwvbGk+XHJcbiAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPC9uYXY+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImNvZGVcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvZGVfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29kZV9faXRlbV9faW1nXCI+PGltZyBzcmM9XCJhcHAvYXNzZXRzL2ltZy9RUi5qcGdcIiBhbHQ9XCJcIi8+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvZGVfX2l0ZW1fX2RhdGFcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEFjY291bnRJbWFnZSBjbGFzc05hbWU9XCJwcm9maWxlLWljb25cIiBhY2NvdW50PXtcImRlbGVnYXRlLmtlbmNvZGVcIn0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8RHJvcERvd25NZW51IG1lbnVJdGVtcz17W1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHsgcGF5bG9hZDogJzEnLCB0ZXh0OiAnZGVsZWdhdGUua2VuY29kZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICB7IHBheWxvYWQ6ICcyJywgdGV4dDogJ2RlbGVnYXRlLmtlbmNvZGUyJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRhLXRleHRcIj5CVFNGd21pRDlDN2g3UThmSFU5eTNmQWI1SmhMQ1BCRXpSWlczPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJjb2RlLWJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgICA8TGluayB0bz1cInJlY2VpdmVcIiBjbGFzc05hbWU9XCJidG4gYnRuLXJlY2VpdmVcIj5yZWNlaXZlPC9MaW5rPlxyXG4gICAgICAgICAgICAgIDxMaW5rIHRvPVwic2VuZFwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2VuZFwiPnNlbmQ8L0xpbms+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPEJhbGFuY2VzIC8+XHJcbiAgICAgICAgICAgIDxUcmFuc2FjdGlvbnMgLz5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSG9tZVNjcmVlbjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjOi9iaXRzaGFyZXN3YWxsZXQvd3d3L2FwcC9jb21wb25lbnRzL0hvbWVTY3JlZW4uanN4XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==