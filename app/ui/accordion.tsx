'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AccordionItem {
  title: string;
  content?: string | null;
  list?: string[];
  description?: string[] | null;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpened?: number[];
  className?: string;
  style?: React.CSSProperties;
  // Удалили renderItem, чтобы не передавать функции извне
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  defaultOpened = [],
  className,
  style,
}) => {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpened);

  const toggleItem = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes(multiple ? [...openIndexes, index] : [index]);
    }
  };

  // Функция для рендера содержимого элемента аккордеона
  const renderItemContent = (item: AccordionItem) => (
    <div className="flex flex-col gap-2">
      {item.content && (
        <p className="italic text-gray-900 pl-4 pt-4">{item.content}</p>
      )}
      {item.list && (
        <ul className="pl-10 pb-4 list-disc">
          {item.list.map((listItem, index) => (
            <li key={index}>{listItem}</li>
          ))}
        </ul>
      )}
      {item.description && (
        <ul className="pl-10 pb-4 list-decimal flex flex-col gap-2">
          {item.description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div style={style} className={className}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={index} style={{ marginBottom: '0.5rem' }}>
            {/* Заголовок элемента */}
            <button
              onClick={() => toggleItem(index)}
              disabled={item.disabled}
              className="w-full text-left rounded-md font-bold text-green-500 py-2 px-4 bg-green-100 hover:bg-green-200"
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.title}
            </button>

            {/* Контент элемента */}
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              style={{
                maxHeight: isOpen ? '1000px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}
              className="bg-gray-100 px-4 "
            >
              {renderItemContent(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
