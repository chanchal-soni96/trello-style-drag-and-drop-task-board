import {
  Combobox as HeadlessCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ComboboxOptionType {
  label: string;
  value: string;
}

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOptionType[];
  placeholder?: string;
}

function Combobox({
  value,
  onChange,
  options,
  placeholder = "Select an option",
}: ComboboxProps) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .includes(query.toLowerCase()),
        );

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  return (
    <HeadlessCombobox
      value={value}
      onChange={(selectedValue: string | null) => {
        if (selectedValue) {
          onChange(selectedValue);
        }
      }}
      onClose={() => setQuery("")}
    >
      <div className="relative">
        {/* Input */}

        <ComboboxInput
          aria-label={placeholder}
          displayValue={() =>
            selectedOption?.label ?? ""
          }
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder={placeholder}
          className="
            w-full
            rounded-lg
            border
            border-slate-300
            bg-white
            px-3
            py-2
            pr-10
            text-sm
            text-slate-900
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
          "
        />

        {/* Dropdown Button */}

        <ComboboxButton
          className="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            px-3
            text-slate-500
            dark:text-slate-400
          "
          aria-label="Open options"
        >
          <ChevronDown size={18} />
        </ComboboxButton>

        {/* Options */}

        <ComboboxOptions
          className="
            absolute
            z-50
            mt-1
            max-h-60
            w-full
            overflow-auto
            rounded-lg
            border
            border-slate-200
            bg-white
            p-1
            shadow-lg
            focus:outline-none
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          {filteredOptions.length === 0 ? (
            <div
              className="
                px-3
                py-2
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              No options found.
            </div>
          ) : (
            filteredOptions.map((option) => (
              <ComboboxOption
                key={option.value}
                value={option.value}
                className="
                  group
                  flex
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-md
                  px-3
                  py-2
                  text-sm
                  text-slate-700
                  data-[focus]:bg-blue-50
                  data-[focus]:text-blue-700
                  dark:text-slate-200
                  dark:data-[focus]:bg-slate-800
                  dark:data-[focus]:text-blue-400
                "
              >
                <span>{option.label}</span>

                <Check
                  size={16}
                  className="
                    invisible
                    group-data-[selected]:visible
                  "
                />
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </HeadlessCombobox>
  );
}

export default Combobox;