// components/AccessoryInventoryForm.tsx
import { TextInput, Checkbox, Button } from '@/components/FormLibrary';
import type { FormComponentProps } from '../types';
import { useFieldArray } from 'react-hook-form';

export const AccessoryInventoryForm = ({ hookForm }: FormComponentProps) => {
    const {
        register,
        formState: { errors },
        control,
    } = hookForm;

    // Initialize useFieldArray for accessories
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'registration.rockDetails.accessories',
    });

    return (
        <div>
            <h2 className="mt-0">Accessory Inventory</h2>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        marginBottom: '10px',
                    }}
                >
                    <h3>Accessory {index + 1}</h3>
                    <TextInput
                        label="Accessory Type"
                        {...register(
                            `registration.rockDetails.accessories.${index}.type`,
                            {
                                required: 'Accessory type is required',
                            },
                        )}
                        error={
                            errors.registration?.rockDetails?.accessories?.[
                                index
                            ]?.type
                        }
                    />
                    <TextInput
                        label="Date Accessory Added"
                        type="date"
                        {...register(
                            `registration.rockDetails.accessories.${index}.dateAdded`,
                            {
                                required:
                                    'Date of accessory addition is required',
                            },
                        )}
                        error={
                            errors.registration?.rockDetails?.accessories?.[
                                index
                            ]?.dateAdded
                        }
                    />
                    <TextInput
                        label="Accessory Material"
                        {...register(
                            `registration.rockDetails.accessories.${index}.material`,
                        )}
                        error={
                            errors.registration?.rockDetails?.accessories?.[
                                index
                            ]?.material
                        }
                    />
                    <Checkbox
                        label="Is the accessory securely attached?"
                        {...register(
                            `registration.rockDetails.accessories.${index}.securelyAttached`,
                        )}
                        error={
                            errors.registration?.rockDetails?.accessories?.[
                                index
                            ]?.securelyAttached
                        }
                    />
                    <Button
                        type="button"
                        onClick={() => remove(index)}
                        style={{
                            marginTop: '10px',
                            backgroundColor: '#f44336',
                            color: '#fff',
                        }}
                    >
                        Remove Accessory
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                onClick={() =>
                    append({
                        type: '',
                        dateAdded: new Date().toISOString().split('T')[0],
                        material: '',
                        securelyAttached: false,
                    })
                }
                style={{ backgroundColor: '#4CAF50', color: '#fff' }}
            >
                Add Accessory
            </Button>
            {errors.registration?.rockDetails?.accessories?.message && (
                <p style={{ color: 'red' }}>
                    {errors.registration.rockDetails.accessories.message}
                </p>
            )}
        </div>
    );
};
