const allRoles = {
  1: [],
  2: ['manageUser','getUser'],
  3: ['manageUser', 'manageUser','getUser'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
