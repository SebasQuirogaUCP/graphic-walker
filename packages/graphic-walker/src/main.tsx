import { inject } from '@vercel/analytics';
import './index.css';
import { embedGraphicWalker } from './vanilla';

if (!import.meta.env.DEV) {
    inject();
}

embedGraphicWalker(document.getElementById('root') as HTMLElement, {
    geoList: [
        { name: 'World Countries', type: 'TopoJSON', url: 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json' },
        {
            name: 'World Cities',
            type: 'GeoJSON',
            url: 'https://raw.githubusercontent.com/drei01/geojson-world-cities/f2a988af4bc15463df55586afbbffbd3068b7218/cities.geojson',
        },
    ],
    // importVisSettings: exportedViewSpec as IVisImportExportSettings,
    // importVisSettings: { category: 'Demo', visName: 'Test Vis Name', dataSet: [], dataSource: [], spec: [] } as IVisImportExportSettings,
    // onSaveVis(settings) {
    //     console.info('settings', settings);
    // },
    // saveModalCategoryList: ['Demo', 'Sandbox', 'Dev01'],
});
