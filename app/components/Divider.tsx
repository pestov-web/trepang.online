interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: string | number;
  width?: string;
  height?: string;
  dashed?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color = '#ebe6e7',
  thickness = 1,
  width = '100%',
  height = '100%',
  dashed = false,
  className,
  style,
  children,
}) => {
  const thicknessValue =
    typeof thickness === 'number' ? `${thickness}px` : thickness;

  if (orientation === 'vertical') {
    return (
      <div
        style={{
          height,
          borderLeft: `${thicknessValue} ${
            dashed ? 'dashed' : 'solid'
          } ${color}`,
          ...style,
        }}
        className={className}
      />
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        width,
        ...style,
      }}
      className={className}
    >
      {!children ? (
        <div
          style={{
            width: '100%',
            borderBottom: `${thicknessValue} ${
              dashed ? 'dashed' : 'solid'
            } ${color}`,
          }}
        />
      ) : (
        <>
          <div
            style={{
              flex: 1,
              borderBottom: `${thicknessValue} ${
                dashed ? 'dashed' : 'solid'
              } ${color}`,
            }}
          />
          {children}
          <div
            style={{
              flex: 1,
              borderBottom: `${thicknessValue} ${
                dashed ? 'dashed' : 'solid'
              } ${color}`,
            }}
          />
        </>
      )}
    </div>
  );
};

export default Divider;
