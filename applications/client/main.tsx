import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import '@app/styles/_styles.scss';
import {Provider} from 'react-redux';
import {initRoutes} from '@/app/providers/index.ts';
import {StrictMode} from 'react';
import {store} from "@app/store/store.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={initRoutes()}/>
        </Provider>
    </StrictMode>,
);
