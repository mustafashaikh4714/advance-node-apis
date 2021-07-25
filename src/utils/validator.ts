import { ObjectSchema, ValidationError } from 'joi'

interface ValidatorType {
    error: ValidationError | undefined
    values: any
    errors: string[]
}

type V = Record<string, unknown>
type Validator = (schema: ObjectSchema, object: V) => ValidatorType

const validate: Validator = (schema: ObjectSchema, object: V) => {
    let error: ValidationError | undefined
    let values
    let errors: string[] = []
    try {
        const { error: err, value: val } = schema.validate(object, {
            abortEarly: false
        })

        error = err
        values = val

        if (error && error.message) {
            errors = error.message?.split('.')
        }
    } catch (e) {
        error = e
        errors = [e.message]
    }
    return { values, error, errors }
}

export default validate
