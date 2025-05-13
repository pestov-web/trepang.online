import React from 'react';

interface AlertProps {
  variant?: 'solid' | 'outline' | 'soft';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
  title?: string;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode; // Описание теперь передается через children
}

const colorMap = {
  primary: '#3b82f6',
  secondary: '#6b7280',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
};

const Alert: React.FC<AlertProps> = ({
  variant = 'solid',
  color = 'primary',
  icon,
  title,
  closable = false,
  onClose,
  className,
  style,
  children, // Используем children для описания
}) => {
  const baseColor = colorMap[color] || colorMap.primary;

  const variantStyles = {
    solid: {
      backgroundColor: baseColor,
      color: '#fff',
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: baseColor,
      border: `1px solid ${baseColor}`,
    },
    soft: {
      backgroundColor: `${baseColor}20`,
      color: baseColor,
      border: 'none',
    },
  };

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '0.375rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        ...variantStyles[variant],
        ...style,
      }}
      className={className}
    >
      {icon && (
        <div style={{ display: 'flex', alignItems: 'center' }}>{icon}</div>
      )}

      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
            {title}
          </div>
        )}
        {children && <div style={{ fontSize: '0.875rem' }}>{children}</div>}
      </div>

      {closable && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: variant === 'solid' ? '#fff' : baseColor,
            padding: 0,
            marginLeft: '0.5rem',
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
