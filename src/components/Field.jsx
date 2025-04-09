import React, { useState } from 'react';

function Field({ field, isPalette = false, updateField, removeField }) {
    const [isEditing, setIsEditing] = useState(false);
    const [fieldData, setFieldData] = useState(field);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFieldData(prev => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...fieldData.options];
        newOptions[index] = value;
        setFieldData(prev => ({ ...prev, options: newOptions }));
    };



    const removeOption = (index) => {
        setFieldData(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }));
    };

    const saveChanges = () => {
        updateField(field.id, fieldData);
        setIsEditing(false);
    };

    const renderField = () => {
        switch (field.type) {
            case 'text':
                return <input type="text" placeholder={field.placeholder} disabled />;
            case 'checkbox':
                return (
                    <div>
                        {field.options?.map((opt, i) => (
                            <div key={i}>
                                <input type="checkbox" id={`${field.id}-${i}`} disabled />
                                <label htmlFor={`${field.id}-${i}`}>{opt}</label>
                            </div>
                        ))}
                    </div>
                );
            case 'date':
                return <input type="date" disabled />;
            default:
                return <div>Unknown field type</div>;
        }
    };

    const renderEditForm = () => {
        return (
            <div className="field-edit-form">
                <div>
                    <label>Label:</label>
                    <input
                        type="text"
                        name="label"
                        value={fieldData.label}
                        onChange={handleChange}
                    />
                </div>

                {field.type === 'text' && (
                    <div>
                        <label>Placeholder:</label>
                        <input
                            type="text"
                            name="placeholder"
                            value={fieldData.placeholder || ''}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {(field.type === 'checkbox') && (
                    <div className="field-options">
                        <label>Options:</label>
                        {fieldData.options?.map((opt, i) => (
                            <div key={i} className="option-row">
                                <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => handleOptionChange(i, e.target.value)}
                                />
                                <button type="button" onClick={() => removeOption(i)}>
                                    ×
                                </button>
                            </div>
                        ))}

                    </div>
                )}

                <div className="form-actions">
                    <button type="button" onClick={saveChanges}>
                        Save
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={`field ${isPalette ? 'palette-field' : ''}`}>
            {!isPalette && (
                <div className="field-header">
                    <h4>{field.label}</h4>
                    <div className="field-actions">
                        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
                        <button onClick={() => removeField(field.id)}>Delete</button>
                    </div>
                </div>
            )}

            {isEditing && !isPalette ? renderEditForm() : renderField()}
        </div>
    );
}

export default Field;