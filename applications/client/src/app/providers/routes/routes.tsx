import {createBrowserRouter, Navigate} from 'react-router-dom';
import {BoardPage, BoardsPage, IssuesPage} from '@pages';
import {ROUTES} from '@shared/constants';
import {RLayout} from '@widgets/RLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to={ROUTES.ISSUES.path} replace/>,
            },
            {
                path: ROUTES.ISSUES.path,
                element: <IssuesPage/>,
            },
            {
                path: ROUTES.BOARDS.path,
                element: <BoardsPage/>,
            },
            {
                path: ROUTES.BOARD.path,
                element: <BoardPage/>,
            },
        ],
    },
]);