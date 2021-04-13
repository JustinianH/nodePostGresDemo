import filterUserByAge from '../../../services/userFilterService';

test("expects no user over 35", () => {
  let users = [
    { id: 1, name: "mike", age: 39 },
    { id: 1, name: "mark", age: 22 },
  ];

  let expected = [{ id: 1, name: "mike", age: 39 }];

  expect(filterUserByAge(users, 35)).toEqual(expected);
});