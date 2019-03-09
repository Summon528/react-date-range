'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isEqual = require('date-fns/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isValid = require('date-fns/isValid');

var _isValid2 = _interopRequireDefault(_isValid);

var _parse = require('date-fns/parse');

var _parse2 = _interopRequireDefault(_parse);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateInput = function (_PureComponent) {
  _inherits(DateInput, _PureComponent);

  function DateInput(props, context) {
    _classCallCheck(this, DateInput);

    var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props, context));

    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);

    _this.state = {
      invalid: false,
      changed: false,
      value: _this.formatDate(props)
    };
    return _this;
  }

  _createClass(DateInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = this.props.value;


      if (!(0, _isEqual2.default)(value, nextProps.value)) {
        this.setState({ value: this.formatDate(nextProps) });
      }
    }
  }, {
    key: 'formatDate',
    value: function formatDate(_ref) {
      var value = _ref.value,
          dateDisplayFormat = _ref.dateDisplayFormat,
          dateOptions = _ref.dateOptions;

      if (value && (0, _isValid2.default)(value)) {
        return (0, _format2.default)(value, dateDisplayFormat, dateOptions);
      }
      return '';
    }
  }, {
    key: 'update',
    value: function update(value) {
      var _state = this.state,
          invalid = _state.invalid,
          changed = _state.changed;


      if (invalid || !changed || !value) {
        return;
      }

      var _props = this.props,
          onChange = _props.onChange,
          dateDisplayFormat = _props.dateDisplayFormat,
          dateOptions = _props.dateOptions;

      var parsed = (0, _parse2.default)(value, dateDisplayFormat, new Date(), dateOptions);

      if ((0, _isValid2.default)(parsed)) {
        this.setState({ changed: false }, function () {
          return onChange(parsed);
        });
      } else {
        this.setState({ invalid: true });
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      var value = this.state.value;


      if (e.key === 'Enter') {
        this.update(value);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      this.setState({ value: e.target.value, changed: true, invalid: false });
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      var value = this.state.value;

      this.update(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          readOnly = _props2.readOnly,
          placeholder = _props2.placeholder,
          disabled = _props2.disabled,
          onFocus = _props2.onFocus;
      var _state2 = this.state,
          value = _state2.value,
          invalid = _state2.invalid;


      return _react2.default.createElement(
        'span',
        { className: (0, _classnames2.default)('rdrDateInput', className) },
        _react2.default.createElement('input', {
          readOnly: readOnly,
          disabled: disabled,
          value: value,
          placeholder: placeholder,
          onKeyDown: this.onKeyDown,
          onChange: this.onChange,
          onBlur: this.onBlur,
          onFocus: onFocus
        }),
        invalid && _react2.default.createElement(
          'span',
          { className: 'rdrWarning' },
          '\u26A0'
        )
      );
    }
  }]);

  return DateInput;
}(_react.PureComponent);

DateInput.propTypes = {
  value: _propTypes2.default.object,
  placeholder: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  dateOptions: _propTypes2.default.object,
  dateDisplayFormat: _propTypes2.default.string,
  className: _propTypes2.default.string,
  onFocus: _propTypes2.default.func.isRequired,
  onChange: _propTypes2.default.func.isRequired
};

DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY'
};

exports.default = DateInput;