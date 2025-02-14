import { parseAsString, useQueryState } from "nuqs"

export const useSendEmailModal = () => {
  const [InviteLink, setInviteLink] = useQueryState("send-email", parseAsString)

  const open = ({ inviteLink }: { inviteLink: string }) =>
    setInviteLink(inviteLink)
  const close = () => setInviteLink(null)

  return {
    InviteLink,
    open,
    close,
    setInviteLink,
  }
}
