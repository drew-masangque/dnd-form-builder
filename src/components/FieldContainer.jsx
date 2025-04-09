import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Field from './Field';

function FieldContainer({ fields, onDrop, onDragOver, updateField, removeField, reorderFields }) {
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        reorderFields(result);
    };

    return (
        <div
            className="field-container"
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <h3>Form Builder</h3>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="fields">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="droppable-area"
                        >
                            {fields.map((field, index) => (
                                <Draggable key={field.id} draggableId={field.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="draggable-field"
                                        >
                                            <Field
                                                field={field}
                                                updateField={updateField}
                                                removeField={removeField}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default FieldContainer;