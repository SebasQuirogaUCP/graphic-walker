import { DOMProvider } from '@kanaries/react-beautiful-dnd';
import { observer } from 'mobx-react-lite';
import React, { forwardRef, useState, type ForwardedRef } from 'react';
import App, { IGWProps } from './App';
import AppRoot from './components/appRoot';
import { FieldsContextWrapper } from './fields/fieldsContext';
import type { IGWHandler, IGWHandlerInsider } from './interfaces';
import { ShadowDom } from './shadow-dom';
import { StoreWrapper } from './store/index';

import './empty_sheet.css';

export const GraphicWalker = observer(
    forwardRef<IGWHandler, IGWProps>((props, ref) => {
        const { storeRef } = props;

        const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

        const handleMount = (shadowRoot: ShadowRoot) => {
            setShadowRoot(shadowRoot);
        };
        const handleUnmount = () => {
            setShadowRoot(null);
        };

        return (
            <StoreWrapper keepAlive={props.keepAlive} storeRef={storeRef}>
                <AppRoot ref={ref as ForwardedRef<IGWHandlerInsider>}>
                    <ShadowDom onMount={handleMount} onUnmount={handleUnmount}>
                        <DOMProvider value={{ head: shadowRoot ?? document.head, body: shadowRoot ?? document.body }}>
                            <FieldsContextWrapper>
                                <App {...props} />
                            </FieldsContextWrapper>
                        </DOMProvider>
                    </ShadowDom>
                </AppRoot>
            </StoreWrapper>
        );
    })
);

export { getGlobalConfig } from './config';
export * from './interfaces';
export { ColorSchemes, ISegmentKey } from './interfaces';
export { default as PureRenderer } from './renderer/pureRenderer';
export type { IGlobalStore } from './store/index';
export { VizSpecStore } from './store/visualSpecStore';
export * from './utils/save';
export { resolveSpecFromStoInfo } from './utils/save';
export { embedGraphicWalker } from './vanilla';
export type { IGWProps };

