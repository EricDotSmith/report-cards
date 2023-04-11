import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { CriteriaType } from "@acme/db";

type TypeObject = { type: CriteriaType; label: string };

const types: TypeObject[] = [
  { type: "BOOLEAN", label: "Yes / No" },
  { type: "COMMENT", label: "Comment" },
  { type: "ASSESSMENT", label: "Performance Assessment" },
];

interface CriteriaTypeListBoxProps {
  onChange: (value: CriteriaType) => void;
  type?: CriteriaType;
}

const CriteriaTypeListBox: React.FC<CriteriaTypeListBoxProps> = ({
  onChange,
  type,
}) => {
  const [selected, setSelected] = useState<TypeObject | undefined>(
    !!type
      ? { type, label: types.find((t) => t.type === type)?.label ?? "" }
      : types[0],
  );

  const handleSelect = (value: TypeObject) => {
    setSelected(value);
    onChange(value.type);
  };

  return (
    <div className="w-full">
      <Listbox name="type" value={selected} onChange={handleSelect}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#f6f3ec] py-2 text-left focus:outline-none  focus-visible:ring-[#f6f3ec] focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
            <span className="block truncate">{selected?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              style={{ zIndex: 1 }}
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {types.map((type, typeIdx) => (
                <Listbox.Option
                  key={typeIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={type}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {type.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CriteriaTypeListBox;
