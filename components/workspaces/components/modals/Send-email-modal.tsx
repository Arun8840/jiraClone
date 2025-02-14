"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useSendEmailModal } from "@/hooks/use-send-email"
import { Send } from "lucide-react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { sendEmailSchema } from "../../schema/schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetParamId } from "@/hooks/use-getParamId"
import { useSendWorkspaceInviteLink } from "../../api/use-send-inviteLink-email"
import { Loader } from "@/Utility/Ui/Loader"

type InviteFormType = z.infer<typeof sendEmailSchema>
function SendEmailModal() {
  const { workspaceId } = useGetParamId()
  const { mutate, isPending } = useSendWorkspaceInviteLink()
  const { InviteLink, close } = useSendEmailModal()

  const form = useForm<InviteFormType>({
    defaultValues: { email: "", inviteLink: InviteLink as string },
    resolver: zodResolver(sendEmailSchema),
  })

  const handle_sendEmail = (data: InviteFormType) => {
    mutate(
      {
        form: data,
        param: { workspaceId },
      },
      {
        onSuccess: () => {
          close()
          form.reset()
        },
      }
    )
  }

  useEffect(() => {
    form.reset({ inviteLink: InviteLink ?? "" })
  }, [InviteLink])

  return (
    <>
      <Dialog open={!!InviteLink} onOpenChange={close}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Workspace Link</DialogTitle>
            <DialogDescription>
              Please enter the recipient&apos;s email address to send the
              workspace link.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handle_sendEmail)}
              className="space-y-3 flex flex-col h-full justify-between"
            >
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter recipient email"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inviteLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled
                          className="text-primary"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" variant={"ghost"} disabled={isPending}>
                {isPending ? (
                  <Loader />
                ) : (
                  <>
                    <Send size={18} />
                    Send
                  </>
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SendEmailModal
