import React from 'react'
import ButtonIcon from '../../ui/ButtonIcon'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useLogout } from './useLogout'

export default function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon onClick={() => logout()} disabled={isLoading}>
        <HiArrowRightOnRectangle/>
    </ButtonIcon>
  )
}
