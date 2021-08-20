import React from 'react';
import {useDraggable} from "@dnd-kit/core";
import styles from './Draggable.module.css'

const DragOverlayDraggable = (props) => {
    const Element = props.element || 'div';
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <Element ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </Element>
    )
}

export default DragOverlayDraggable