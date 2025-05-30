import { useState } from 'react'

export const useDisabledButton = (isDisabled, message) => {
  const [showMessage, setShowMessage] = useState(false)

  const handleDisabledClick = () => {
    if (!isDisabled) return

    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  return {
    showMessage,
    handleDisabledClick,
    message
  }
}
