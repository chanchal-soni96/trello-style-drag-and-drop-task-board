import type { ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  children: ReactNode;
  defaultValue?: string;
}

function Accordion({
  children,
  defaultValue,
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={defaultValue}
      className="w-full"
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

interface AccordionItemProps {
  value: string;
  children: ReactNode;
}

function AccordionItem({
  value,
  children,
}: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      value={value}
      className="border-b border-slate-200 dark:border-slate-700"
    >
      {children}
    </AccordionPrimitive.Item>
  );
}

interface AccordionTriggerProps {
  children: ReactNode;
}

function AccordionTrigger({
  children,
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        className="
          flex
          w-full
          items-center
          justify-between
          py-4
          text-left
          text-sm
          font-semibold
          text-slate-900
          outline-none
          transition
          hover:text-blue-600
          focus-visible:ring-2
          focus-visible:ring-blue-500
          dark:text-white
          dark:hover:text-blue-400
        "
      >
        {children}

        <ChevronDown
          size={18}
          className="
            transition-transform
            duration-200
            data-[state=open]:rotate-180
          "
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

interface AccordionContentProps {
  children: ReactNode;
}

function AccordionContent({
  children,
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className="
        overflow-hidden
        text-sm
        text-slate-600
        dark:text-slate-400
      "
    >
      <div className="pb-4">
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};