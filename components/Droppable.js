import React from 'react'
import {useDroppable} from '@dnd-kit/core'
import styles from './Droppable.module.css'

const Droppable = (props) => {
    // setNodeRef sets "node" and "rect". in node, a ref to the current node is passed in. rect is for the advanced use case,
    // when you need the bounding rect measurement of the droppable area.
    // isOver is a boolean value that becomes true when draggable item comes over this Droppable container.
    // over contains other Droppable container's id over which Draggable item is.
    const {isOver, setNodeRef, node, rect, over} = useDroppable({
        id: props.id, // there should be no other DROPPABLE elements that share that same id within a given DndContext provider.
        // it is possible to use use both useDroppable and useDraggable at once in one component, because they are stored in
        // different key-value store.
        // there can be multiple Droppable containers, but they should all have unique id.
        // for multiple Droppable containers, use hook several times and reference them with separate setNodeRef.
        // To render dynamically the list of Droppable containers, create re-usable component and render them
        // with Array.map()
        disabled: false, // optional. since hook cannot be invoked conditionally, use argument disabled instead.
        data: {
            // optional. enable access to additional data about the droppable element in event handlers, modifiers or custom sensors
            // via for example: (in event handler function) event.over.data.current.DATA_YOU_PUT...
            // https://docs.dndkit.com/api-documentation/droppable/usedroppable
        },
    });
    const style = {
        color: isOver ? 'green' : undefined
    };

    return (
        /* droppable containers should have their own node (referenced with "setNodeRef") */
        <div className={styles.droppable} ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}

export default Droppable