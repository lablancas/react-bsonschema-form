import React, { PropTypes } from "react";
import Datetime from 'react-datetime';
import moment from 'moment';

import 'react-datetime/css/react-datetime.css';

function stringifyDate ({ date, utc }) {
  if (date == null) {
    return date
  }
  if (utc) {
    return moment(date).utc().format('L LT')
  } else {
    return moment(date).format('L LT')
  }
}

function cleanValue (value) {
  if (value && (typeof value.toDate === 'function')) {
    return value.toDate();
  } else {
    return undefined;
  }
}

function DateField(props) {
  const {onChange, formData, readonly, disabled, uiSchema} = props;
  const {StringField} = props.registry.fields;
  const {utc} = uiSchema['ui:options'] || {};

  if (readonly || disabled) {
    const formDataString = stringifyDate({ date: formData, utc })
    return <StringField
      {...props}
      formData={formDataString}/>
  } else {
    return (
      <Datetime
        {...props}
        utc={utc}
        input
        timeFormat={false}
        value={formData}
        onChange={(value) => onChange(cleanValue(value))}
      />
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  DateField.propTypes = {
    value: PropTypes.string,
  };
}

export default DateField;
