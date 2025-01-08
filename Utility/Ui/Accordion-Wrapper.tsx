import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React, { ReactNode } from "react"

interface AccordionProps {
  children: ReactNode
  content?: {
    title: string | null | undefined
    description?: string | null | undefined
  }
}

function AccordionWrapper({ children, content }: AccordionProps) {
  const title = content?.title ?? "Title"
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AccordionWrapper
