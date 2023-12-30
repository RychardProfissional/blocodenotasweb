import prisma from "./prisma";

export async function createUser(data) {
  try {
    return await prisma.user.create({ data: data });
  } catch (err) {
    return null;
  }
}

export async function readUser(where) {
  try {
    return await prisma.user.findUnique({ where: where });
  } catch (err) {
    return false;
  }
}

export async function updateUser(id, data) {
  try {
    return await prisma.user.update({ where: { id: id }, data: data });
  } catch (err) {
    return null;
  }
}

export async function deleteUser(where) {
  try {
    return await prisma.user.delete({ where: where });
  } catch (err) {
    return null;
  }
}
