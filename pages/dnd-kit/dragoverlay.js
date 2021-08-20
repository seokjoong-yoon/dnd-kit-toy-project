import React from 'react'
import {
    DndContext,
    DragOverlay,
} from "@dnd-kit/core";

import DragOverlayDraggable from '../../components/DragOverlayDraggable'
import Droppable from '../../components/Droppable'
import styles from "../../components/Draggable.module.css";

const DragOverlayExample = () => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [parent, setParent] = React.useState(null);
    const Item = (props) => (
        <div className={styles.draggable}>{props.message}</div>
    ) // Let Item component be presentational component and DragOverlayDraggable be container component, so that
      // there is no collision in animation when actually dragging the item.
    const ANIMATION_DURATION = 200

    return (
        <DndContext onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}>
            {
                parent===null?
                    <DragOverlayDraggable id="draggable-element">
                        {isDragging?null:<Item message="Drag Me!"/>}
                    </DragOverlayDraggable>
                    : null
            }

            <Droppable id="droppable">
                {
                    parent==="droppable"?
                        <DragOverlayDraggable><Item message={"I've been dropped!"}/></DragOverlayDraggable>
                        : "Drop Here!"
                }
            </Droppable>

            {/* props of DragOverlay contains below:
            - children: DragOverlay can contain children as below, but that JSX should not contain useDraggable hook.
                        prefer conditionally rendering CHILD of DragOverlay, not conditionally rendering DragOverlay itself.
                        otherwise, drop animation will not work.
            - className, style: If you'd like to customize the wrapper element that the DragOverlay's children are
                                rendered into, use the className and style props
            - dropAnimation: drop animation configuration.
            - modifiers: For example, you can use modifiers to restrict the movement of the <DragOverlay> to the bounds of the window
            - transition
            - wrapperElement: By default, the <DragOverlay> component renders your elements within a div element.
                              If your draggable elements are list items, you'll want to update the <DragOverlay>
                              component to render a ul wrapper instead, since wrapping a li item without a parent
                              ul is invalid HTML
            - zIndex: The zIndex prop sets the z-order of the drag overlay. The default value is 999 for compatibility
                      reasons, but we highly recommend you use a lower value. */}
            <DragOverlay dropAnimation={
                {duration:ANIMATION_DURATION, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'}
            } zIndex={2}>
                {isDragging? <Item message="I'm being dragged!"/> : null}
            </DragOverlay>
            {/*make sure that the components rendered within the drag overlay do not use the useDraggable hook.
            The <DragOverlay> component should remain mounted at all times so that it can perform the drop animation.
            If you conditionally render the <DragOverlay> component, drop animations will not work.
            As a rule of thumb, try to render the <DragOverlay> outside fo your draggable components,
            and follow the presentational component pattern to maintain a good separation of concerns.*/}
        </DndContext>
    );

    function handleDragStart(event) {
        setIsDragging(event.active.id);
    }

    function handleDragEnd(event) {
        const {over} = event;
        setTimeout(()=>setIsDragging(false), ANIMATION_DURATION)
        setParent(over?over.id:null);
    }
}

export default DragOverlayExample