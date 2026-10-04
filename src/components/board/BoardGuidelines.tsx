import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";

function BoardGuidelines() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          px-5
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <Accordion>
          <AccordionItem value="guidelines">
            <AccordionTrigger>
              Board Guidelines
            </AccordionTrigger>

            <AccordionContent>
              <ul className="space-y-2">
                <li>
                  • Drag tasks between columns to update
                  their status.
                </li>

                <li>
                  • Use the edit button to update task
                  details.
                </li>

                <li>
                  • Delete tasks that are no longer
                  required.
                </li>

                <li>
                  • Mark a task as completed when the work
                  is finished.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

export default BoardGuidelines;