import React, { useState, useRef, useEffect } from 'react';
import styles from './RSelect.module.scss';
import clsx from 'clsx';
import {RSelectProps, SelectOption} from "./types.ts";


export const RSelect: React.FC<RSelectProps> = ({
                                                  options,
                                                  value,
                                                  onChange,
                                                  placeholder = 'Select...',
                                                  className,
                                                  disabled = false,
                                                  error = false,
                                                  errorMessage,
                                                  ...props
                                                }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  // Инициализация выбранного значения
  useEffect(() => {
    if (value) {
      const option = options.find(opt => opt.value === value);
      if (option) setSelectedOption(option);
    }
  }, [value, options]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    setSelectedOption(option);
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
      <div
          className={clsx(
              styles.selectContainer,
              className,
              disabled && styles.disabled,
              error && styles.error
          )}
          ref={selectRef}
          {...props}
      >
        <div
            className={clsx(styles.selectHeader, isOpen && styles.open)}
            onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {selectedOption ? (
              <div className={styles.selectedValue}>
                {selectedOption.icon && (
                    <span className={styles.optionIcon}>{selectedOption.icon}</span>
                )}
                <span>{selectedOption.label}</span>
              </div>
          ) : (
              <span className={styles.placeholder}>{placeholder}</span>
          )}

          <span className={styles.arrowIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        </div>

        {isOpen && (
            <div className={styles.optionsList}>
              {options.map((option) => (
                  <div
                      key={option.value}
                      className={clsx(
                          styles.optionItem,
                          selectedOption?.value === option.value && styles.selected
                      )}
                      onClick={() => handleSelect(option)}
                  >
                    {option.icon && (
                        <span className={styles.optionIcon}>{option.icon}</span>
                    )}
                    <span>{option.label}</span>
                  </div>
              ))}
            </div>
        )}

        {error && errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
  );
};