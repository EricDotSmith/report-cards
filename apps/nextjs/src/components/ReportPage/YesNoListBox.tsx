import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type YesNoType = "YES" | "NO" | "";

type TypeObject = { type: YesNoType; label: string };

const types: TypeObject[] = [
  { type: "YES", label: "Yes" },
  { type: "NO", label: "No" },
  { type: "", label: "" },
];

interface YesNoListBoxProps {
  onChange: (value: YesNoType) => void;
  type?: YesNoType;
  name: string;
  id: string;
}

const YesNoListBox: React.FC<YesNoListBoxProps> = ({
  onChange,
  type,
  name,
  id,
}) => {
  const [currentSelected, setCurrentSelected] = useState<
    TypeObject | undefined
  >(
    !!type || type === ""
      ? { type, label: types.find((t) => t.type === type)?.label ?? "" }
      : types[0],
  );

  useEffect(() => {
    setCurrentSelected(
      !!type || type === ""
        ? { type, label: types.find((t) => t.type === type)?.label ?? "" }
        : types[0],
    );
  }, [id, setCurrentSelected, type]);

  const handleSelect = (value: TypeObject) => {
    setCurrentSelected(value);
    onChange(value.type);
  };

  return (
    <div className="">
      <Listbox name={name} value={currentSelected} onChange={handleSelect}>
        <div className="relative mt-1">
          <Listbox.Button className="relative min-h-[36px] w-full cursor-default rounded-lg border-2 bg-transparent py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-orange-500 focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-0 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{currentSelected?.label}</span>
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
                    `relative min-h-[36px] cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={type}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          currentSelected?.type === type.type
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        {type.label}
                      </span>
                      {currentSelected?.type === type.type ? (
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

export default YesNoListBox;
