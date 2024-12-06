import React from 'react';

// Mapeie os caminhos dos ícones
const iconMap = {
  alter: '/alter.png',
  chevron: '/chevron.png',
  exchange: '/exchange.png',
  rightArrow: '/right-arrow.png',
  unitedStates: '/united-states.png', 
  BRL: '/BRL.png',
  AUD: '/AUD.png', 
  EUR: '/EUR.png',
  JPY: '/JPY.png', 
  USD: '/USD.png',
};

type IconProps = {
  name: keyof typeof iconMap; // Restringe os valores aceitos aos nomes definidos no mapa
  size?: number; // Tamanho opcional
  className?: string; // Estilização extra
  onClick?: () => void;
};

export const Icon: React.FC<IconProps> = ({ name, size = 24, className = '', onClick }) => {
  const iconSrc = iconMap[name];

  if (!iconSrc) {
    console.warn(`Icon "${name}" não encontrado no mapa.`);
    return null;
  }

  return (
    <img
      src={iconSrc}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={className}
      onClick={onClick}
    />
  );
};
