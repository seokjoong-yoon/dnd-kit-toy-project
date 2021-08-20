import React from 'react';
import {useDraggable} from "@dnd-kit/core";
import styles from './Draggable.module.css'

const Draggable = (props) => {
    // The useDraggable hook requires that you attach listeners to the DOM node that you would like
    // to become the activator to start dragging.
    // In order to actually see your draggable items move on screen, you'll need to move the item using CSS.
    // The transform object adheres to the following shape: {x: number, y: number, scaleX: number, scaleY: number}
    // attributes contains below:
    // - role="button": If possible, we recommend you use a semantic <button> element for the DOM element
    //                  you plan on attaching draggable listeners to.
    // - tabIndex=0: In order for your draggable elements to receive keyboard focus, they need to have the
    //               tabindex attribute set to 0 if they are not natively interactive elements like <button>
    // - aria-roledescription="draggable"
    // - aria-describedby="DndContext-[uniqueId]": Each draggable item is provided a unique aria-describedby ID
    //                that points to the screen reader instructions to be read out when a draggable item receives focus.
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        /* It is highly recommended to specify "touch-action" CSS property for all Draggable element set to "none"
        in order to prevent scrolling on mobile devices. */
        <div className={styles.draggable} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </div>
    )
}

export default Draggable