import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '24px',
    fontFamily: 'Palanquin',
    fontWeight: 700,
    lineHeight: '32px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: 'Grade 1',
};

const GradeTitle = (props: {text: string, styles?: React.CSSProperties}) => {
  return (
    <div style={{
      ...styles.Text as React.CSSProperties,
     ...props.styles,
    }}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default GradeTitle;