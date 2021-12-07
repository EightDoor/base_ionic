const log = {
  /**
   * success
   * @param val
   * @param title
   */
  s: (val: any, title?: string) => {
    console.group(`${title || 'success'} ->`);
    console.log(val);
    console.groupEnd();
  },

  /**
   * info
   * @param val
   * @param title
   */
  i: (val: any, title?: string) => {
    console.group(`${title || 'info'} ->`);
    console.log(val);
    console.groupEnd();
  },

  /**
   * debug
   * @param val
   * @param title
   */
  d: (val: any, title?: string) => {
    console.group(`${title || 'debug'} ->`);
    console.log(val);
    console.groupEnd();
  },
  /**
   * error
   * @param val
   * @param title
   */
  e: (val: any, title?: string) => {
    console.group(`${title || 'error'} ->`);
    console.log(val);
    console.groupEnd();
  },
};

export default log;
