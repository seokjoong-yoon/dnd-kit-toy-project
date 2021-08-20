import React, {useState} from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {SortableItem} from '../../components/SortableItem';

function Sortable() {
    const [items, setItems] = useState(['1', '2', '3', '4', '5', '6', '7']);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
        // By default, the Keyboard sensor moves the active draggable item by 25 pixels in the direction of the arrow key
        // that was pressed. This is an arbitrary default, and can be customized using the coordinateGetter option of
        // the keyboard sensor.
);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            {/* SortableContext is an additional context to provide data to useSortable hook.
            In order for the SortableContext component to function properly, make sure it is a descendant of a
            DndContext provider. You may nest multiple SortableContext components within the same parent DndContext.
            SortableContext does not expose any callback props. To know when a sortable (draggable) item is being picked
            or moved over another sortable (droppable) item, use the callback props of DndContext:*/}
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map(id => <SortableItem key={id} id={id} />)}
            </SortableContext>
        </DndContext>
    );

    function handleDragEnd(event) {
        const {active, over} = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id); // active means the sortable item that is picked up
                const newIndex = items.indexOf(over.id); // over means the sortable item (droppable container) over which
                                                        // active item is.

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
}

export default Sortable

// Read below to apply DragOverlay to Sortable list.
// https://docs.dndkit.com/presets/sortable#drag-overlay