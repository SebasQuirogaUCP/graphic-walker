import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IGWProps } from '../../App';
import { useGlobalStore } from '../../store';
import DefaultButton from '../button/default';
import PrimaryButton from '../button/primary';
import Modal from '../modal';

const SaveVisualization: React.FC<Pick<IGWProps, 'saveModalCategoryList' | 'onSaveVis'>> = observer(({ saveModalCategoryList, onSaveVis }) => {
    const { commonStore, vizStore } = useGlobalStore();
    const { showSaveVisualizationPanel } = commonStore;
    const { t } = useTranslation();
    const initialCategory = saveModalCategoryList && saveModalCategoryList.length > 0 ? saveModalCategoryList[0] : '';
    const [form, setForm] = useState<{ name: string | undefined; category: string | undefined }>({ name: undefined, category: initialCategory });

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 overflow-y-visible">
            <Modal
                show={showSaveVisualizationPanel}
                onClose={() => {
                    commonStore.setShowSaveVisualizationPanel(false);
                }}
            >
                <div>
                    <span className="block text-md font-medium leading-6 mb-2">Save Visualization</span>

                    <div className="mt-2">
                        <span className="text-sm">Name</span>
                        <input
                            defaultValue={commonStore.visNameAndCustomCategory.visName ?? ''}
                            onChange={(e) => {
                                setForm({ name: e.target.value, category: form?.category });
                            }}
                            type="text"
                            name="text"
                            className="mb-2 block w-full rounded-md border-0 px-2 py-1.5 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />

                        {/*** Just for select ***/}
                        {/* <select
                            name="categories"
                            className="block w-full rounded-md border-0 px-2 py-1.5 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => {
                                setForm({ name: form?.name, category: e.target.value });
                            }}
                        >
                            {saveModalCategoryList?.map((c, i) => {
                                return (
                                    <option value={c} key={i}>
                                        {c}
                                    </option>
                                );
                            })}
                        </select> */}

                        {/*** Issue with writing and selecting *** /}
                        {/* {saveModalCategoryList && saveModalCategoryList.length > 0 && (
                            <ComboboxSelector
                                list={saveModalCategoryList}
                                onChange={function (selected: string): void {
                                    throw new Error('Function not implemented.');
                                }}
                            />
                        )} */}

                        {saveModalCategoryList && saveModalCategoryList.length > 0 && (
                            <>
                                <span className="text-sm mt-2">Category</span>

                                <input
                                    defaultValue={commonStore.visNameAndCustomCategory.visCustomCategory ?? ''}
                                    type="text"
                                    id="custom-select"
                                    list="options"
                                    className="block w-full rounded-md border-0 px-2 py-1.5 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                        e.defaultPrevented;
                                        setForm({ name: form.name, category: e.target.value });
                                    }}
                                />
                                <datalist id="options">
                                    {saveModalCategoryList?.map((c, i) => {
                                        return <option value={c} key={i} />;
                                    })}
                                </datalist>
                            </>
                        )}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <PrimaryButton
                            className="mr-2"
                            text={'Save'}
                            onClick={() => {
                                commonStore.setVisNameAndCustomCategory({
                                    name: form?.name ?? commonStore.visNameAndCustomCategory.visName ?? 'unknown',
                                    category: form?.category ?? commonStore.visNameAndCustomCategory.visCustomCategory ?? 'unknown category',
                                });
                                commonStore.setShowSaveVisualizationPanel(false);
                                vizStore.exportViewSpecWithCB((visSettings) => (onSaveVis ? onSaveVis(visSettings) : visSettings));
                            }}
                        />

                        <DefaultButton
                            text={t('actions.cancel')}
                            onClick={() => {
                                commonStore.setShowSaveVisualizationPanel(false);
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
});

export default SaveVisualization;
