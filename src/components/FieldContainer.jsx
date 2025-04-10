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
                <Droppable
                    droppableId="fields"
                    isDropDisabled={false}
                    isCombineEnabled={true}
                    ignoreContainerClipping={false}
                >
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`droppable-area ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                        >
                            {fields.map((field, index) => (
                                <Draggable
                                    key={field.id}
                                    draggableId={field.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`draggable-field ${snapshot.isDragging ? 'dragging' : ''}`}
                                            style={provided.draggableProps.style}
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