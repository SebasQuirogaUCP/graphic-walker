import { Combobox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react-lite';
import React, { Fragment, useState } from 'react';
import { useGlobalStore } from '../../store';

interface ComboboxSelectProps {
    list: Array<string>;
    onChange: (selected: string) => void;
}

const ComboboxSelect: React.FC<ComboboxSelectProps> = observer(({ list, onChange }) => {
    const { commonStore, vizStore } = useGlobalStore();
    const [selected, setSelected] = useState<string>();

    return (
        <div>
            <Combobox
                // value={selected}
                onChange={(e) => {
                    // console.info('This is the value', selected);
                    console.info('This is the value', e);
                }}
            >
                <div className="relative mt-1">
                    <div>
                        <Combobox.Input
                            className="block w-full rounded-md border-0 px-2 py-1.5 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => {
                                e.defaultPrevented;
                                setSelected(e.target.value);
                            }}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        // afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {list.map((item, index) => (
                                <Combobox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'}`
                                    }
                                    value={item}
                                >
                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item}</span>
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
});

export default ComboboxSelect;
