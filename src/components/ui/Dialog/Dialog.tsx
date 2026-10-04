import type { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface DialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Dialog({
  children,
  open,
  onOpenChange,
}: DialogProps) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      {children}
    </DialogPrimitive.Root>
  );
}

interface DialogTriggerProps {
  children: ReactNode;
}

function DialogTrigger({
  children,
}: DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger asChild>
      {children}
    </DialogPrimitive.Trigger>
  );
}

interface DialogContentProps {
  children: ReactNode;
}

function DialogContent({
  children,
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      {/* Background overlay */}
      <DialogPrimitive.Overlay
        className="
          fixed
          inset-0
          z-50
          bg-slate-950/60
          backdrop-blur-sm
        "
      />

      {/* Dialog box */}
      <DialogPrimitive.Content
        className="
          fixed
          left-1/2
          top-1/2
          z-50
          w-[calc(100%-2rem)]
          max-w-lg
          -translate-x-1/2
          -translate-y-1/2
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-2xl
          focus:outline-none
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {children}

        {/* Close button */}
        <DialogPrimitive.Close
          type="button"
          aria-label="Close dialog"
          className="
            absolute
            right-4
            top-4
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <X size={18} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

interface DialogTitleProps {
  children: ReactNode;
}

function DialogTitle({
  children,
}: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className="
        text-xl
        font-bold
        text-slate-900
        dark:text-white
      "
    >
      {children}
    </DialogPrimitive.Title>
  );
}

interface DialogDescriptionProps {
  children: ReactNode;
}

function DialogDescription({
  children,
}: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className="
        mt-1
        text-sm
        text-slate-500
        dark:text-slate-400
      "
    >
      {children}
    </DialogPrimitive.Description>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
};