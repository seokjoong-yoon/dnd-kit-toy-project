import React from 'react'
import {
    closestCenter,
    defaultAnnouncements,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    LayoutMeasuringStrategy
} from "@dnd-kit/core";
import {
    restrictToVerticalAxis
} from "@dnd-kit/modifiers";

import Draggable from '../../components/Draggable'
import Droppable from '../../components/Droppable'

const DndExample = () => {
    const containers =['A', 'B', 'C', 'D', 'E'];
    const [parent, setParent] = React.useState(null);
    const draggableMarkup = (
        <Draggable id="draggable">Drag Me!</Draggable>
    );
    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 0,
        }
    });
    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        }
    });
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)


    return (
        // onDragStart, onDragMove, onDragOver, onDragEnd are the event listeners that can be passed to DndContext as props.
        // onDragStart: fires when a drag event that meets the activation constraints for that sensor happens, along with
        //              the id of the picked up draggable item.
        // onDragMove: fires when a draggable item is moved. Depending on the activated sensor, this can be as the pointer
        //             is moved or the keyboard movement keys are pressed.
        // onDragOver: fires when a draggable item is over droppable container, along with the id of that droppable container
        // onDragEnd: fires after a draggable item is dropped. This event contains information about the active
        //            draggable id along with information on which droppable container the draggable item was dropped over
        //            (in event.over.id, puts that droppable container's id). onDragEnd event DOES NOT move draggable items
        //            into droppable containers. Additional works should be done to specify what to do, for example, use state.
        // onDragCancel: fires if a drag operation is cancelled, for example, if escape key is pressed.
        // announcement: object containing announcement text for the screen reader is passed in.
        // autoScroll: Use the optional autoScroll boolean prop to temporarily or permanently disable auto-scrolling
        //             for all sensors used within this DndContext.
        // collisionDetection: Use the collisionDetection prop to customize the collision detection algorithm used to
        //                     detect collisions between draggable nodes and droppable areas within theDndContext provider.
        //                     options: rectIntersection, closestCenter, closestCorners from @dnd-kit/core.
        // sensors: Sensors are an abstraction to detect different input methods in order to initiate drag operations,
        //          respond to movement and end or cancel the operation. Defaults are: Pointer, Keyboard sensors.
        // modifiers: Modifiers let you dynamically modify the movement coordinates that are detected by sensors.
        //            They can be used for a wide range of use cases. options are:
        //             - restrictToHorizontalAxis
        //             - restrictToVerticalAxis
        //             - restrictToWindowEdges
        //             - restrictToParentElement
        //             - restrictToFirstScrollableAncestor
        // layoutMeasuring: You can configure when and how often DndContext should measure its droppable elements by
        //                  using the layoutMeasuring prop.
        <DndContext onDragEnd={handleDragEnd}
                    announcement={defaultAnnouncements}
                    autoScroll={true}
                    // collisionDetection={closestCenter}
                    sensors={sensors}
                    // modifiers={[restrictToVerticalAxis]}
                    layoutMeasuring={{strategy: LayoutMeasuringStrategy.WhileDragging}}>
            {/* Sensors may define one or multiple activator events. Activator events use
            React SyntheticEvent listeners (whose instance is passed to all event handlers by default like stopPropagation())
            , which leads to improved performance over manually adding event listeners to each individual draggable node.
            Sensors are initialized once one of the activator events is detected. The lifecycle of a sensor is as follows:
            - Activator event detected, if the event is qualified, sensor class is initialized.
            - Sensor manually attaches new listeners to input methods upon initialization.
            - Sensor dispatches drag start event once constraints are met.
            - Sensor dispatches drag move events in response to input.
            - Sensor dispatches drag end or drag cancel event.
            - Sensor is torn down and cleans up manually attached event listeners.
            */}
            {parent===null ? draggableMarkup : null}
            {containers.map((id)=>(
                <Droppable key={id} id={id}>
                    {parent===id?draggableMarkup:"Drop Here!"}
                </Droppable>
            ))}
        </DndContext>
    );

    function handleDragEnd(event) {
        const {over} = event;
        setParent(over?over.id:null)
    }
}

export default DndExample