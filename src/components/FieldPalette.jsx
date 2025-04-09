import React from 'react';
import Field from './Field';

const fieldTypes = [
    { type: 'text', label: 'Text Input', placeholder: 'Enter text...' },
    { type: 'checkbox', label: 'Checkbox', options: ['Option 1'] },
    { type: 'date', label: 'Date Picker' }
];

function FieldPalette() {
    const handleDragStart = (e, fieldType) => {
        e.dataTransfer.setData('application/json', JSON.stringify({
            type: fieldType.type,
            label: fieldType.label,
            ...fieldType
        }));
    };

    return (
        <div className="field-palette">
            <h3>Field Types</h3>
            <div className="palette-fields">
                {fieldTypes.map((fieldType, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, fieldType)}
                        className="palette-field"
                    >
                        <Field field={fieldType} isPalette />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FieldPalette;