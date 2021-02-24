/* eslint-disable import/prefer-default-export */
export const getFormattedDate = () => new Date().toLocaleDateString().replace(/\//g, '-');
