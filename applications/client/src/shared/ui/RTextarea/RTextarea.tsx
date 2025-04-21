import React, { forwardRef, TextareaHTMLAttributes, useEffect, useRef } from 'react';
import styles from './RTextarea.module.scss';
import clsx from "clsx";

export interface RTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: 'primary' | 'secondary';
    error?: boolean;
    errorMessage?: string;
    showCharCount?: boolean;
    maxHeight?: number;
}

export const RTextarea = forwardRef<HTMLTextAreaElement, RTextareaProps>(
    (
        {
            variant = 'primary',
            error = false,
            errorMessage,
            showCharCount = false,
            className = '',
            maxLength,
            maxHeight = 300,
            value,
            onChange,
            ...props
        },
        ref
    ) => {
        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const currentLength = typeof value === 'string' ? value.length : 0;

        const adjustHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = 'auto';
                const newHeight = Math.min(textarea.scrollHeight, maxHeight);
                textarea.style.height = `${newHeight}px`;
            }
        };

        useEffect(() => {
            adjustHeight();
        }, [value]);

        const combinedRef = (instance: HTMLTextAreaElement | null) => {
            if (typeof ref === 'function') {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
            textareaRef.current = instance;
        };

        return (
            <div className={`r-textarea-wrapper ${className}`}>
                <textarea
                    ref={combinedRef}
                    className={clsx(
                        styles['r-textarea'],
                        styles[`r-textarea--${variant}`],
                        error && styles['r-textarea--error']
                    )}
                    value={value}
                    maxLength={maxLength}
                    onChange={onChange}
                    {...props}
                />

                {error && errorMessage && (
                    <div className={styles['r-textarea-error-message']}>{errorMessage}</div>
                )}

                {(showCharCount && maxLength) && (
                    <div className={styles['r-textarea-char-count']}>
                        {currentLength}/{maxLength}
                    </div>
                )}
            </div>
        );
    }
);

RTextarea.displayName = 'RTextarea';