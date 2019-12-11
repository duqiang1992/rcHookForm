import React, { useEffect, useImperativeHandle, useMemo, forwardRef } from 'react';
import FromContext from '../formDataContext';
import { xtForm, left, top, right } from './form.scss';
import PropTypes from 'prop-types';
import event from '../event';
import { formatData } from '../utils/utils';

function addEventListen() {
  const formData = {};
  const formCheckList = [];
  const eventKey = new Date().getTime() + Math.floor(Math.random() * 100);
  event.on('addVla' + eventKey, ({ type, prop, value, validate }) => {
    switch (type) {
      case 'INIT':
        formCheckList.push({ validate, prop });
        formData[prop] = value;
        break;
      case 'VALUE':
        formData[prop] = value;
        break;
    }
  });
  return {
    formCheckList,
    eventKey,
    formData,
  };
};

function XtForm({ labelPosition, className, children }, ref) {
  console.log('xfForm-Render')
  const classNameMerge = useMemo(() => {
    let classNameMerge;
    switch (labelPosition) {
      case 'top':
        classNameMerge = `${xtForm} ${top} ${className || ''}`;
        break;
      case 'left':
        classNameMerge = `${xtForm} ${left} ${className || ''}`;
        break;
      case 'right':
        classNameMerge = `${xtForm} ${right} ${className || ''}`;
        break;
    }
    return classNameMerge;
  }, [labelPosition, className]);
  const { formCheckList, eventKey, formData } = addEventListen();
  useEffect(() => {
    return function cleanup() {
      event.remove('addVla' + eventKey);
    };
  });
  useImperativeHandle(ref, () => ({
    getFormData: (format) => {
      return format ? formatData(format, formData) : formData;
    },
    validatorForm: (cb, format) => {
      format = JSON.parse(JSON.stringify(format));
      const length = formCheckList.length;
      let count = 0;
      let checkResult = true;
      formCheckList.forEach((obj) => {
        obj.validate(formData[obj.prop], (err) => {
          if (err && checkResult) checkResult = false;
          count++;
          if (count >= length) {
            cb(checkResult, format ? formatData(format, formData) : formData);
          }
        });
      });
    },
  }));
  return (
    <FromContext.Provider value={{ eventKey }}>
      <div className={classNameMerge}>
        {React.Children.map(children, item => {
          return item;
        })}
      </div>
    </FromContext.Provider>
  );
}

XtForm.propTypes = {
  labelPosition: PropTypes.string,
  labelWidth: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  className: PropTypes.string,
  form: PropTypes.object,
  rules: PropTypes.object,
  ref: PropTypes.object
};

export default forwardRef(XtForm);
