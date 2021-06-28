import createUserId from '.';

describe('CreateUserId', () => {
  it('Совпадения при создания id пользователя', () => {
    const testCreateUserId = () => {
      let arrayId = [];
      let status = false; // Статус false ошибки нет;
      for (let i = 0; i < 5000; i++) {
        arrayId.push(createUserId());
      }

      if (arrayId.length === 0) {
        status = true;
      }

      arrayId = arrayId.filter(
        (elem, pos, arr) =>
          pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem),
      );
      if (arrayId.length > 0) {
        status = true;
      }
      return status;
    };

    expect(testCreateUserId()).toBe(false);
  });
});
