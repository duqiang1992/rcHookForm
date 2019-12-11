import React, { useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import FromContext from '../formDataContext';
import Schema from 'async-validator';
import event from '../event';

Schema.warning = function() {
};

function checkFormItem(prop, validator, setMessage) {
  return function(value, call) {
    validator.validate({ [prop]: value }, { first: true }).then(() => {
      setMessage({
        value: value,
        message: '',
      });
      call && call();
    }).catch(({ errors }) => {
      setMessage({
        value: value,
        message: errors[0].message,
      });
      call && call(errors);
    });
  };
}

function emitValue(eventKey, prop, value) {
  event.emit('addVla' + eventKey, {
    type: 'VALUE',
    prop,
    value,
  });
}

function createFormItem(child, eventKey, value, message, validator, prop, setFormItemInfo) {
  const { fromctr, preChange, className } = child.props;
  if (!fromctr) return child;
  return React.cloneElement(child, {
    value,
    className: message ? className + ' validateErr' : className,
    onChange: (event) => {
      event.persist && event.persist();
      const data = event.target.value;
      // 实行用户的onChange
      preChange && preChange(data);
      // 给Form实时同步值
      emitValue(eventKey, prop, data);
      // 验证表单
      validator.validate({ [prop]: data }).then(() => {
        setFormItemInfo({
          value: data,
          message: '',
        });
      }).catch(({ errors }) => {
        setFormItemInfo({
          value: data,
          message: errors[0].message,
        });
      });
    },
  });
}

function FormItem({ prop, children, rules, isRequire, label, defaultValue, className, contentClass, errClass, style }) {
  const [{ value, message }, setFormItemInfo] = useState({
    value: defaultValue,
    message: '',
  });
  const { eventKey } = useContext(FromContext);
  const validator = useMemo(() => {
    console.log('initMemo', prop);
    return new Schema({ [prop]: rules });
  }, [rules, prop]);
  useEffect(() => {
    console.log('initEvent', prop);
    event.emit('addVla' + eventKey, {
      validate: checkFormItem(prop, validator, setFormItemInfo),
      type: 'INIT',
      prop,
      value,
    });
  }, [eventKey, prop]);
  return (
    <div className={`form-item ${className || ''}`} style={style}>
      <div className={`form-item-label ${isRequire ? 'require' : ''}`}>
        <span>{label}</span>
      </div>
      <div className={`${contentClass || ''} form-item-content`}>
        {React.Children.map(children, item => {
          return createFormItem(item, eventKey, value, message, validator, prop, setFormItemInfo);
        })}
        <span className={errClass || 'errMsg'}>{message}</span>
      </div>
    </div>
  );
}

FormItem.propTypes = {
  formData: PropTypes.object,
  rules: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  isRequire: PropTypes.bool,
  className: PropTypes.string,
  prop: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  style: PropTypes.object,
  defaultValue: PropTypes.any,
  contentClass: PropTypes.string,
  errClass: PropTypes.string,
};

export default FormItem;
