const createUserId = () =>
  'yyyyyyxxxxxxxxxx'.replace(/[xy]/g, (c): string => {
    const r = (int = 26): number => (Math.random() * int) | 0;
    return c === 'y' ? String.fromCharCode(r() + 97) : String(r(10));
  });

export default createUserId;
