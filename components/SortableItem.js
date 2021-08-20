import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform, // The transform property for the useSortable hook behaves similarly to the transform property of the
        // useDraggable hook for the active sortable item, when there is no DragOverlay being used.
        transition, // The default transition is 250 milliseconds, with an easing function set to ease,
        // but you can customize this and pass any valid CSS transition timing function, or set the transition
        // argument to null to disable transitions entirely as bellow:
    } = useSortable(
        {
            id: props.id,
            transition: {
                duration: 150,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)' // similar to dragOverlay's prop "dropAnimation"
            }
        });
    // useSortable is an abstraction that composes both the useDroppable and useDraggable hooks.
    // sortable item contains two component at the same time: the Droppable container and Draggable item.

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <p>{`Sortable Item: ${props.id}`}</p>
        </div>
    );
}

export default SortableItem