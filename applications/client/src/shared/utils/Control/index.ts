/**
 * Создает функцию, которая откладывает выполнение переданной функции до тех пор,
 * пока не пройдет указанное время задержки с момента последнего вызова.
 *
 * @template T - Тип функции, которую нужно отложить
 * @param {T} func - Функция, которую нужно отложить
 * @param {number} delay - Задержка в миллисекундах
 * @returns {T} - Функция-обертка, которая откладывает выполнение
 *
 * @example
 * // Отложить обработчик события прокрутки
 * const handleScroll = debounce(() => {
 *   console.log('Прокрутка завершена');
 * }, 300);
 *
 * window.addEventListener('scroll', handleScroll);
 */
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  } as T;
}

/**
 * Создает функцию, которая ограничивает частоту вызовов переданной функции.
 * Функция будет выполняться не чаще, чем раз в указанный интервал времени.
 *
 * @template T - Тип функции, которую нужно ограничить
 * @param {T} func - Функция, которую нужно ограничить
 * @param {number} limit - Минимальный интервал между вызовами в миллисекундах
 * @returns {T} - Функция-обертка, которая ограничивает частоту вызовов
 *
 * @example
 * // Ограничить частоту вызовов обработчика события прокрутки
 * const handleScroll = throttle(() => {
 *   console.log('Прокрутка обработана');
 * }, 500);
 *
 * window.addEventListener('scroll', handleScroll);
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(func: T, limit: number): T => {
  let lastCall = 0;

  return function (this: unknown, ...args: unknown[]) {
    const now = Date.now();

    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  } as T;
};
