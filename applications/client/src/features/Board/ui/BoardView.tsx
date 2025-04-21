import styles from './BoardView.module.scss';
import {BoardViewProps} from "./types.ts";
import {IssuesView} from "@features/Issues";
import {Droppable} from "@hello-pangea/dnd";

export const BoardView: React.FC<BoardViewProps> = (props:BoardViewProps) => {
    return (
        <Droppable droppableId={props.droppableId}>
            {(provided) => (
                <div
                    className={styles['board-column']}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <div className={styles['board-column__header']}>
                        <h3>{props.title}</h3>
                    </div>

                    <IssuesView
                        issues={props.issues}
                        className={styles['board-column__view']}
                        state={{loading: false, error: null}}
                        onTaskClick={props.onTaskClick}
                        droppableProvided={provided}
                    />
                </div>
            )}
        </Droppable>
    );
};