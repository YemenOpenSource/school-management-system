import Profile from '@/app/dashboard/users/[id]/profile'
import Button from '@/components/ui/button'
import Title from '@/components/ui/title'
import { IClientResponse, IRole, IUser } from '@/definitions'
import { getCurrentUser, getRoleById } from '@/lib/actions'
import React from 'react'

type Props = {}

export default async function page({ }: Props) {
  const user = await getCurrentUser() as IClientResponse<IUser>
  const { data } = await getRoleById(Number(user?.data?.roles?.[0])) as IClientResponse<IRole>

  return (
    <div>
      <Title title="Profile">
        <Button href="/dashboard/users" value="Users" />
      </Title>
      <div className="w-full flex items-center justify-center"><Profile userById={user} role={data?.name ?? ''} /> </div>
    </div>
  )
}