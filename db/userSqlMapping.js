var user = {
  insert:'INSERT INTO test(id, name, age) VALUES(0,?,?)',
  update:'update test set name=?, age=? where id=?',
  delete: 'delete from test where id=?',
  queryPassword: 'select password from test where account="zzx"',
};

module.exports = user;