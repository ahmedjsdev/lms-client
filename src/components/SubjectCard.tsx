import React from 'react';

const styles = {
  Card: {
    top: '104px',
    left: '32px',
    width: '326px',
    height: '239px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0px 0px 9px rgba(3,3,3,0.1)',
    display: 'flex',
    flexDirection: 'column' as React.CSSProperties['flexDirection'],
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
};

const SubjectCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={styles.Card}>
      {children}
    </div>
  );
};

export default SubjectCard;