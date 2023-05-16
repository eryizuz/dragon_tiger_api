import { test } from '@japa/runner'
import { UserRegisterEntity } from 'App/Authentication/domain/register.entity'
import Hash from '@ioc:Adonis/Core/Hash'
import { UserRegister } from 'App/Authentication/domain/register.value'
import UserModel from 'App/User/infrastructure/user.model'
import { RoleEntity } from 'App/Rol/domain/role.entity'
import { Role } from 'App/Rol/domain/role.value'
import RoleModel from 'App/Rol/infrastructure/role.model'

test.group('Role: Delete a role', (group) => {
  const role: RoleEntity = {
    name: 'test role',
  }
  const newRole = new Role(role)

  group.setup(async () => {
    const userRegister: UserRegisterEntity = {
      name: 'user',
      lastName: 'user',
      userName: 'user',
      email: 'user',
      password: await Hash.make('user'),
      client: 'user',
      rol: 'user',
      status: true,
    }
    const user = new UserRegister(userRegister)

    await UserModel.create(user)
    await RoleModel.create(newRole)
  })

  group.teardown(async () => {
    await UserModel.findOneAndDelete({ email: 'user' }).exec()
    await RoleModel.findOneAndDelete({ name: 'test role' }).exec()
  })

  test('No token provider: Should return a 401 status code and an error message', async ({
    client,
  }) => {
    const response = await client.delete('/role/delete/asd')

    response.assertStatus(401)
    response.assertBodyContains({ error: 'Debe proveer un token de autorización!' })
  })

  test('Token not found: Should return a 400 status code and an error message', async ({
    client,
  }) => {
    const response = await client.delete('/role/delete/asd').header('authentication-x-token', 'asd')

    response.assertStatus(400)
    response.assertBodyContains({ error: 'Token inválido!' })
  })

  test('Roles not found: Should return a 404 status code and an error message if role does no exist', async ({
    client,
  }) => {
    const auth = await client.post('/auth/login').json({ userName: 'user', password: 'user' })

    const response = await client
      .delete(`/role/delete/asd`)
      .header('authentication-x-token', auth.body().authenticationToken)

    response.assertStatus(404)
    response.assertBodyContains({ error: 'No existe el rol!' })
  })

  test('UUID and token OK: Should return a 200 status code and an success message.', async ({
    client,
  }) => {
    const auth = await client.post('/auth/login').json({ userName: 'user', password: 'user' })

    const response = await client
      .delete(`/role/delete/${newRole.uuid}`)
      .header('authentication-x-token', auth.body().authenticationToken)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Rol removido!' })
  })
})
