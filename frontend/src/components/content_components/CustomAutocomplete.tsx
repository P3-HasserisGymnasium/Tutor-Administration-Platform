import React from 'react';
import { Autocomplete } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { Subject} from '~/types/data_types';
import SubjectChip from './SubjectChip';
import TextField from '@mui/material/TextField';
import { SubjectType } from '~/types/data_types';
import { YearGroup } from '~/types/data_types';


interface CustomAutocompleteProps {
    variant: "subject"| "yearGroup";
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({variant}) => {
    switch(variant){
        case "subject":
            return <SubjectAutocomplete/>
        case "yearGroup":
            return <YearGroupAutocomplete/>
        default:
            return null;
    }
}

export default CustomAutocomplete;

function SubjectAutocomplete() {
    const {control} = useFormContext();
    return(
        <Controller
            name="subjects"
            control={control}
            render={({ field }) => (
            <Autocomplete
                multiple
                options={Object.values(Subject.enum)}
                onChange={(_, newValue) => {
                field.onChange(newValue);
                }}
                filterSelectedOptions
                renderTags={(value) => 
                value.map((option, index) => (
                    <SubjectChip key={index} Subject={option as SubjectType} />
                ))
                }
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Subjects"
                    placeholder="Select subject"
                />
                )}
            />
            )}
        />
    )
}

function YearGroupAutocomplete() {
    const {control} = useFormContext();
    return(
        <Controller
            name="year_group"
            control={control}
            render={({ field }) => (
                <Autocomplete
                multiple
                options={Object.values(YearGroup.enum)}
                onChange={(_, newValue) => {
                    field.onChange(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    variant="outlined"
                    label="Year Group"
                    placeholder="Select year group"
                    />  
                )}
                />
            )}
        />
    )
}