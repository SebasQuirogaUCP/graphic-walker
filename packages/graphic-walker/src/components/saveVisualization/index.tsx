import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IGWProps } from '../../App';
import { useGlobalStore } from '../../store';
import DefaultButton from '../button/default';
import PrimaryButton from '../button/primary';
import Modal from '../modal';

const SaveVisualization: React.FC<Pick<IGWProps, 'saveModalCategoryList' | 'onSaveVis'>> = observer(({ saveModalCategoryList, onSaveVis }) => {
    const { commonStore, vizStore } = useGlobalStore();
    const { showSaveVisualizationPanel } = vizStore;
    const { t } = useTranslation();

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 overflow-y-visible">
            <Modal
                show={showSaveVisualizationPanel}
                onClose={() => {
                    vizStore.setShowSaveVisualizationPanel(false);
                }}
            >
                <div>
                    <span className="block text-md font-medium leading-6 mb-2">Save Visualization</span>

                    <div className="mt-2">
                        <span className="text-sm">Name</span>
                        <input
                            defaultValue={vizStore.visNameAndCustomCategory.visName ?? ''}
                            onChange={(e) => {
                                vizStore.setEntireVisNameAndCustomCategory(e.target.value, vizStore.visNameAndCustomCategory.visCustomCategory ?? '');
                            }}
                            type="text"
                            name="text"
                            className="mb-2 block w-full rounded-md border-0 px-2 py-1.5 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />

                        {saveModalCategoryList && saveModalCategoryList.length > 0 && (
                            <>
                                <span className="text-sm mt-2">Category</span>

                                <input
                                    defaultValue={vizStore.visNameAndCustomCategory.visCustomCategory}
                                    type="text"
                                    id="custom-select"
                                    list="options"
                                    className="block w-full rounded-md border-0 px-2 py-1.5 bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => {
                                        e.defaultPrevented;
                                        vizStore.setEntireVisNameAndCustomCategory(vizStore.visNameAndCustomCategory.visName ?? '', e.target.value);
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
                                vizStore.exportViewSpecWithCB((visSettings) => onSaveVis && onSaveVis(visSettings));

                                vizStore.setShowSaveVisualizationPanel(false);
                            }}
                        />

                        <DefaultButton
                            text={t('actions.cancel')}
                            onClick={() => {
                                vizStore.setShowSaveVisualizationPanel(false);
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
});

export default SaveVisualization;
