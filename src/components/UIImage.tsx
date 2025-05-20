import React from 'react';

const styles = {
  ImageContainer: {
    width: '100px',
    height: '100px',
    backgroundImage: 'url(./image.png)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
};

const defaultProps = {
  image: 'https://assets.api.uizard.io/api/cdn/stream/5b6ed5cf-f90a-4186-8b5d-e4e2cd9bb5cb.png',
}

const GradeImage = (props: {image?: string; styles?: React.CSSProperties}) => {
  return (
    <div style={{
      ...styles.ImageContainer,
      backgroundImage: `url(${props.image ?? defaultProps.image})`,
      ...props.styles,
    }} />
  );
};

export default GradeImage;